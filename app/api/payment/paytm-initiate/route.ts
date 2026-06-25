import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { PAYTM_MID, PAYTM_HOST, PAYTM_WEBSITE, PLANS, generateSignature } from "@/lib/paytm";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!process.env.PAYTM_MID || !process.env.PAYTM_KEY) {
    return NextResponse.json(
      { error: "Payments not configured yet. Please contact hello@dadima.app." },
      { status: 503 }
    );
  }

  const { plan } = await req.json();
  const planData = PLANS[plan as keyof typeof PLANS];
  if (!planData) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

  const orderId = `DADIMA_${userId.slice(-8)}_${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
  const amount  = planData.amount.toFixed(2);

  const body = {
    requestType: "Payment",
    mid:         PAYTM_MID,
    websiteName: PAYTM_WEBSITE,
    orderId,
    txnAmount:   { value: amount, currency: "INR" },
    userInfo:    { custId: userId },
  };

  try {
    const res = await fetch(
      `${PAYTM_HOST}/theia/api/v1/initiateTransaction?mid=${PAYTM_MID}&orderId=${orderId}`,
      {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ head: { signature: generateSignature(body) }, body }),
      }
    );

    const data = await res.json();

    if (data.body?.resultInfo?.resultStatus !== "S") {
      console.error("Paytm initiate error:", data.body?.resultInfo);
      return NextResponse.json(
        { error: data.body?.resultInfo?.resultMsg || "Could not initiate payment. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      txnToken: data.body.txnToken,
      orderId,
      amount,
      mid:  PAYTM_MID,
      host: PAYTM_HOST,
      label: planData.label,
      plan,
    });
  } catch (err) {
    console.error("Paytm initiate error:", err);
    return NextResponse.json({ error: "Could not initiate payment. Try again." }, { status: 500 });
  }
}
