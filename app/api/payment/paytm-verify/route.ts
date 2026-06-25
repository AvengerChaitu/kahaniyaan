import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { PAYTM_MID, PAYTM_HOST, generateSignature, verifySignature, PLANS } from "@/lib/paytm";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { orderId, plan } = await req.json();
  if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

  // Query Paytm transaction status
  const body = { mid: PAYTM_MID, orderId };
  const res  = await fetch(`${PAYTM_HOST}/v3/order/status`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ head: { signature: generateSignature(body) }, body }),
  });

  const data = await res.json();
  const info = data.body?.resultInfo;

  // Verify the response signature from Paytm
  if (data.head?.signature) {
    const valid = verifySignature(data.body, data.head.signature);
    if (!valid) {
      return NextResponse.json({ error: "Signature mismatch — possible tampering" }, { status: 400 });
    }
  }

  if (info?.resultStatus !== "TXN_SUCCESS") {
    return NextResponse.json(
      { error: info?.resultMsg || "Payment not successful" },
      { status: 400 }
    );
  }

  // Mark user as paid
  const now   = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const { data: existing } = await supabaseAdmin
    .from("user_usage")
    .select("id")
    .eq("clerk_user_id", userId)
    .eq("month", month)
    .single();

  if (existing) {
    await supabaseAdmin
      .from("user_usage")
      .update({ is_paid: true, plan, updated_at: now })
      .eq("id", existing.id);
  } else {
    await supabaseAdmin
      .from("user_usage")
      .insert({ clerk_user_id: userId, story_count: 0, month, is_paid: true, plan });
  }

  const planData = PLANS[plan as keyof typeof PLANS];

  // Store payment record (ignore if table schema differs)
  await supabaseAdmin.from("payments").insert({
    clerk_user_id: userId,
    paytm_order_id: orderId,
    paytm_txn_id:   data.body?.txnId,
    plan,
    amount: planData?.amount ?? 0,
    created_at: now,
  }).select();

  return NextResponse.json({ success: true });
}
