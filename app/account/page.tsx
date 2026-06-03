"use client";

import { useUser, useClerk, SignInButton, UserButton } from "@clerk/nextjs";

export default function AccountPage() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  if (!isSignedIn) {
    return (
      <div className="p-4" style={{ maxWidth: "500px", margin: "80px auto 0" }}>
        <div style={{
          background: "white", border: "1px solid #ede0d4",
          borderRadius: "28px", padding: "3rem 2rem", textAlign: "center"
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "40px", height: "40px", color: "#bbb" }}><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
            <p style={{ fontSize: "13px", color: "#8a8580" }}>Sign in to manage your account</p>
            <SignInButton mode="modal">
              <button style={{
                background: "var(--amber)", color: "var(--brown)", border: "none",
                padding: "10px 24px", borderRadius: "50px", fontSize: "13px",
                fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 2px 12px rgba(240,163,0,0.3)"
              }}>
                Sign in
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4" style={{ maxWidth: "600px", margin: "80px auto 0", paddingBottom: "80px" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "16px",
        background: "white", border: "1px solid #ede0d4",
        borderRadius: "28px", padding: "24px", marginBottom: "12px"
      }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          overflow: "hidden", flexShrink: 0,
          boxShadow: "0 0 0 3px var(--parch),0 0 0 5px var(--amber)"
        }}>
          <UserButton />
        </div>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--brown)" }}>
            {user?.fullName || user?.primaryEmailAddress?.emailAddress}
          </p>
          <p style={{ fontSize: "12px", color: "#8a8580" }}>
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      <div style={{
        background: "white", border: "1px solid #ede0d4",
        borderRadius: "28px", padding: "24px", marginBottom: "12px"
      }}>
        <h2 style={{ fontSize: "13px", fontWeight: 700, color: "var(--brown)", marginBottom: "12px" }}>
          Plan
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "14px", color: "var(--brown)" }}>Free</p>
            <p style={{ fontSize: "12px", color: "#8a8580" }}>3 stories per month</p>
          </div>
          <button style={{
            background: "var(--amber)", color: "var(--brown)", border: "none",
            padding: "8px 20px", borderRadius: "50px", fontSize: "12px",
            fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 2px 12px rgba(240,163,0,0.3)"
          }}>
            Upgrade
          </button>
        </div>
      </div>

      <div style={{
        background: "white", border: "1px solid #ede0d4",
        borderRadius: "28px", padding: "24px", marginBottom: "12px"
      }}>
        <h2 style={{ fontSize: "13px", fontWeight: 700, color: "var(--brown)", marginBottom: "12px" }}>
          Usage
        </h2>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
          <span style={{ color: "#8a8580" }}>Stories used this month</span>
          <span style={{ color: "var(--brown)", fontWeight: 600 }}>0 / 3</span>
        </div>
      </div>

      <div style={{ textAlign: "center", paddingTop: "12px" }}>
        <button onClick={() => signOut({ redirectUrl: "/" })} style={{
          fontSize: "12px", color: "#bbb", cursor: "pointer",
          background: "none", border: "none", fontFamily: "inherit",
          textDecoration: "underline"
        }}>
          Log out
        </button>
      </div>
    </div>
  );
}
