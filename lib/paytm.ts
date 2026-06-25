import crypto from "crypto";

export const PAYTM_MID     = process.env.PAYTM_MID!;
export const PAYTM_KEY     = process.env.PAYTM_KEY!;
export const PAYTM_WEBSITE = process.env.PAYTM_WEBSITE ?? "WEBSTAGING"; // WEBSTAGING = test, DEFAULT = prod
export const PAYTM_HOST    = process.env.PAYTM_WEBSITE === "DEFAULT"
  ? "https://securegw.paytm.in"
  : "https://securegw-stage.paytm.in";

export const PLANS = {
  premium: { amount: 199, label: "Dadima Premium Plan" },
  family:  { amount: 399, label: "Dadima Family Plan"  },
};

// Paytm v2 JSON API uses HMAC-SHA256 base64 checksum on the body object
export function generateSignature(body: object): string {
  return crypto
    .createHmac("sha256", PAYTM_KEY)
    .update(JSON.stringify(body))
    .digest("base64");
}

export function verifySignature(body: object, signature: string): boolean {
  return generateSignature(body) === signature;
}
