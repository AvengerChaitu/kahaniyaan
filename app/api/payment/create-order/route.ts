import { auth } from "@clerk/nextjs/server";
import { getRazorpay, PLANS } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { plan } = await req.json();
  const planData = PLANS[plan as keyof typeof PLANS];
  if (!planData) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

  const order = await getRazorpay().orders.create({
    amount:   planData.amount,
    currency: "INR",
    notes:    { clerk_user_id: userId, plan },
  });

  return NextResponse.json({
    orderId: order.id,
    amount:  planData.amount,
    keyId:   process.env.RAZORPAY_KEY_ID,
    label:   planData.label,
  });
}
