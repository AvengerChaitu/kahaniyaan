import Razorpay from "razorpay";

// Lazy singleton — not created at module load so build doesn't need the env vars
let _client: Razorpay | null = null;
export function getRazorpay(): Razorpay {
  if (!_client) {
    _client = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }
  return _client;
}

export const PLANS: Record<string, { amount: number; label: string }> = {
  premium: { amount: 19900, label: "Premium Plan" },
  family:  { amount: 39900, label: "Family Plan"  },
};
