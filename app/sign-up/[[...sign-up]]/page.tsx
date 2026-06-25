"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const ref          = searchParams.get("ref");
  const { user, isSignedIn } = useUser();
  const credited     = useRef(false);

  // After Clerk completes signup and reports isSignedIn, fire referral credit once.
  useEffect(() => {
    if (!isSignedIn || !ref || credited.current) return;
    credited.current = true;
    fetch("/api/referral", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ code: ref }),
    }).catch(() => {});
  }, [isSignedIn, ref, user]);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#FFFBF6", gap: 16, padding: "80px 16px",
    }}>
      {ref && (
        <div style={{
          background: "#F5F3FF", border: "1.5px solid #C4B5FD",
          borderRadius: 12, padding: "12px 20px",
          fontSize: 14, color: "#5B21B6", fontWeight: 600,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          🎁 You were invited! Sign up to get <strong>+3 bonus stories</strong> for you and your friend.
        </div>
      )}
      <SignUp />
    </div>
  );
}
