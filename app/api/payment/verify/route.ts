import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    plan,
  } = await req.json();

  // Verify Razorpay signature
  const body     = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Mark user as paid for current month
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
      .update({ is_paid: true, plan, updated_at: new Date() })
      .eq("id", existing.id);
  } else {
    await supabaseAdmin
      .from("user_usage")
      .insert({ clerk_user_id: userId, story_count: 0, month, is_paid: true, plan });
  }

  // Store payment record
  await supabaseAdmin.from("payments").insert({
    clerk_user_id:      userId,
    razorpay_order_id,
    razorpay_payment_id,
    plan,
    amount:             plan === "family" ? 399 : 199,
    created_at:         new Date(),
  }).select(); // ignore error if table doesn't exist yet

  return NextResponse.json({ success: true });
}
