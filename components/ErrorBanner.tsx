"use client";

interface Props {
  error: string;
  showComing: string;
  onCloseError: () => void;
  onCloseComing: () => void;
}

export default function ErrorBanner({ error, showComing, onCloseError, onCloseComing }: Props) {
  if (!error && !showComing) return null;

  return (
    <div style={{ maxWidth: "1120px", margin: "24px auto 0", padding: "0 24px" }}>
      {error && (
        <div style={{
          background: "#fff5f5", border: "1px solid #fecaca",
          borderRadius: "14px", padding: "12px 16px", marginBottom: "12px",
          color: "#b91c1c", fontSize: "13px",
          display: "flex", alignItems: "center", gap: "8px"
        }}>
          <span>⚠️</span>{error}
          <button onClick={onCloseError} style={{
            marginLeft: "auto", background: "none", border: "none",
            cursor: "pointer", color: "#ef4444", fontSize: "18px", lineHeight: 1
          }}>✕</button>
        </div>
      )}
      {showComing && (
        <div style={{
          background: "#f0fdf4", border: "1px solid #bbf7d0",
          borderRadius: "14px", padding: "12px 16px", marginBottom: "12px",
          color: "#166534", fontSize: "13px",
          display: "flex", alignItems: "center", gap: "8px"
        }}>
          <span>🚀</span>{showComing}
          <button onClick={onCloseComing} style={{
            marginLeft: "auto", background: "none", border: "none",
            cursor: "pointer", color: "#16a34a", fontSize: "18px", lineHeight: 1
          }}>✕</button>
        </div>
      )}
    </div>
  );
}
