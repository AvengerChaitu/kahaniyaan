"use client";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Paytm: { CheckoutJS: { init(cfg: Record<string, any>): Promise<void>; invoke(): void; onLoad(fn: () => void): void } };
  }
}

function loadPaytmScript(host: string): Promise<boolean> {
  return new Promise(resolve => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Paytm?.CheckoutJS) return resolve(true);
    const script   = document.createElement("script");
    script.type    = "application/javascript";
    script.src     = `${host}/theia/paytmCallback.js`;
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openPaytmCheckout(
  plan: "premium" | "family",
  onSuccess: () => void,
  onError: (msg: string) => void
) {
  // 1. Get transaction token from our backend
  const initRes  = await fetch("/api/payment/paytm-initiate", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ plan }),
  });
  const initData = await initRes.json().catch(() => ({}));
  if (!initRes.ok) { onError(initData.error || "Could not initiate payment. Try again."); return; }

  const { txnToken, orderId, amount, host } = initData;

  // 2. Load Paytm's checkout script
  const loaded = await loadPaytmScript(host);
  if (!loaded) { onError("Paytm checkout failed to load. Check your connection."); return; }

  // 3. Open the Paytm checkout popup
  await new Promise<void>((resolve, reject) => {
    window.Paytm.CheckoutJS.onLoad(() => {
      window.Paytm.CheckoutJS.init({
        root: "",
        flow: "DEFAULT",
        data: {
          orderId,
          token:     txnToken,
          tokenType: "TXN_TOKEN",
          amount,
        },
        handler: {
          // Fires when the popup closes for any reason (payment done, cancelled, etc.)
          notifyMerchant(eventName: string) {
            if (eventName === "APP_CLOSED") resolve();
          },
        },
      })
        .then(() => window.Paytm.CheckoutJS.invoke())
        .catch(reject);
    });
  });

  // 4. Popup closed — verify payment status on the backend
  try {
    const verifyRes  = await fetch("/api/payment/paytm-verify", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ orderId, plan }),
    });
    const verifyData = await verifyRes.json().catch(() => ({}));

    if (verifyRes.ok && verifyData.success) {
      onSuccess();
    } else {
      // Payment was cancelled or failed — don't treat as error, just silently return
      if (verifyData.error && !verifyData.error.includes("not successful")) {
        onError(verifyData.error);
      }
    }
  } catch {
    onError("Payment received but verification failed. Email hello@dadima.app.");
  }
}
