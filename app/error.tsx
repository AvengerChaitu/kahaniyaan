"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div style={{ background: "#FFFBF6", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 20, padding: "40px 32px", maxWidth: 420, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🪔</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Something went wrong</h2>
        <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 24 }}>
          A story got lost on the way. Try refreshing the page — Dadima will find it.
        </p>
        <button
          onClick={reset}
          style={{ background: "#7C5CFC", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(124,92,252,.3)" }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
