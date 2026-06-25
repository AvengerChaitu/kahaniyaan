import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const PLANS: Record<string, { amount: number; label: string }> = {
  premium: { amount: 19900, label: "Premium Plan" },  // paise
  family:  { amount: 39900, label: "Family Plan"  },
};
