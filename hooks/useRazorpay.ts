"use client";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: new (options: Record<string, any>) => { open(): void };
  }
}

function loadScript(): Promise<boolean> {
  return new Promise(resolve => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout(
  plan: "premium" | "family",
  userEmail: string,
  onSuccess: () => void,
  onError: (msg: string) => void
) {
  // 1. Create order
  const orderRes = await fetch("/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  if (!orderRes.ok) { onError("Could not initiate payment. Try again."); return; }
  const { orderId, amount, keyId, label } = await orderRes.json();

  // 2. Load Razorpay script
  const loaded = await loadScript();
  if (!loaded) { onError("Razorpay failed to load. Check your connection."); return; }

  // 3. Open checkout
  const rzp = new window.Razorpay({
    key:         keyId,
    amount,
    currency:    "INR",
    name:        "Dadima",
    description: label,
    order_id:    orderId,
    prefill:     { email: userEmail },
    theme:       { color: "#7C5CFC" },
    modal:       { backdropclose: false },
    handler: async (response: Record<string, string>) => {
      // 4. Verify
      const verifyRes = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...response, plan }),
      });
      if (verifyRes.ok) {
        onSuccess();
      } else {
        onError("Payment received but verification failed. Email hello@dadima.app.");
      }
    },
  });
  rzp.open();
}
