"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk, useSession, SignInButton, UserButton } from "@clerk/nextjs";

interface SessionActivity {
  id: string;
  browserName?: string;
  deviceType?: string;
  isMobile?: boolean;
}
interface DeviceSession {
  id: string;
  lastActiveAt: Date;
  latestActivity: SessionActivity;
  revoke: () => Promise<unknown>;
}

function deviceLabel(activity: SessionActivity): { icon: string; name: string } {
  const mobile = activity.isMobile || activity.deviceType === "mobile";
  const browser = activity.browserName ?? "";
  if (mobile) {
    const isIOS = /safari/i.test(browser) && !/chrome/i.test(browser);
    return isIOS
      ? { icon: "📱", name: "iPhone / iPad" }
      : { icon: "📱", name: "Android" };
  }
  return { icon: "💻", name: "Computer" };
}

function relativeTime(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (diff === 0) return "Active today";
  if (diff === 1) return "Active yesterday";
  return `Active ${diff} days ago`;
}

const card: React.CSSProperties = {
  background: "#fff",
  border: "1.5px solid #ECECEC",
  borderRadius: 20,
  padding: 24,
  marginBottom: 12,
};

const label: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  color: "#7C5CFC",
  letterSpacing: 1.5,
  textTransform: "uppercase" as const,
  marginBottom: 14,
};

const row: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export default function AccountPage() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { session: currentSession } = useSession();

  const [usage, setUsage] = useState<{ story_count: number; is_paid: boolean } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [devices, setDevices] = useState<DeviceSession[]>([]);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/usage")
        .then(r => r.json())
        .then(d => setUsage(d))
        .catch(console.error);
      user?.getSessions()
        .then(sessions => setDevices(sessions as DeviceSession[]))
        .catch(console.error);
    }
  }, [isSignedIn, user]);

  const handleCancelSubscription = async () => {
    if (!confirm("Cancel your Premium subscription? You keep access until end of current billing period.")) return;
    setCancelling(true);
    await fetch("/api/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "cancel" }),
    });
    setCancelling(false);
    setCancelled(true);
    setUsage(prev => prev ? { ...prev, is_paid: false } : prev);
  };

  const handleDeleteAccount = async () => {
    if (deleteInput !== "DELETE") return;
    setDeleting(true);
    try {
      await fetch("/api/account", { method: "DELETE" });
      await signOut({ redirectUrl: "/" });
    } catch {
      setDeleting(false);
    }
  };

  const handleRevokeSession = async (session: DeviceSession) => {
    if (!confirm("Sign out this device?")) return;
    setRevokingId(session.id);
    await session.revoke();
    setDevices(prev => prev.filter(s => s.id !== session.id));
    setRevokingId(null);
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await fetch("/api/export");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "dadima-stories.json";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div style={{ maxWidth: 500, margin: "80px auto 0", padding: "0 20px" }}>
        <div style={{ ...card, textAlign: "center", padding: "48px 32px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 40, height: 40, margin: "0 auto 12px", display: "block" }}><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
          <p style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 20 }}>Sign in to manage your account</p>
          <SignInButton mode="modal">
            <button style={{ background: "#7C5CFC", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(124,92,252,.3)" }}>
              Sign in
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  const isPaid = usage?.is_paid ?? false;
  const storyCount = usage?.story_count ?? 0;
  const limit = isPaid ? "∞" : "3";

  return (
    <div style={{ maxWidth: 560, margin: "80px auto 0", padding: "40px 20px 80px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", letterSpacing: "-.02em", marginBottom: 24 }}>Account</h1>

      {/* Profile */}
      <div style={{ ...card, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #E0D9FF" }}>
          <UserButton />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{user?.fullName || user?.primaryEmailAddress?.emailAddress}</div>
          <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>{user?.primaryEmailAddress?.emailAddress}</div>
        </div>
      </div>

      {/* Plan */}
      <div style={card}>
        <div style={label}>Plan</div>
        <div style={row}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
              {isPaid ? "Premium" : "Free"}
              {isPaid && <span style={{ marginLeft: 8, fontSize: 11, background: "#F5F3FF", color: "#7C5CFC", padding: "2px 10px", borderRadius: 999, fontWeight: 700 }}>Active</span>}
              {cancelled && <span style={{ marginLeft: 8, fontSize: 11, background: "#FEF3C7", color: "#92400E", padding: "2px 10px", borderRadius: 999, fontWeight: 700 }}>Cancelled</span>}
            </div>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>
              {isPaid ? "Unlimited story generations" : "3 stories per month"}
            </div>
          </div>
          {!isPaid && (
            <button
              onClick={() => window.location.href = "/#pricing"}
              style={{ background: "#7C5CFC", color: "#fff", border: "none", padding: "9px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(124,92,252,.25)" }}
            >
              Upgrade
            </button>
          )}
          {isPaid && !cancelled && (
            <button
              onClick={handleCancelSubscription}
              disabled={cancelling}
              style={{ background: "none", color: "#EF4444", border: "1.5px solid #FCA5A5", padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              {cancelling ? "Cancelling…" : "Cancel subscription"}
            </button>
          )}
        </div>
      </div>

      {/* Usage */}
      <div style={card}>
        <div style={label}>Usage this month</div>
        <div style={row}>
          <span style={{ fontSize: 14, color: "#374151" }}>Stories generated</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
            {usage === null ? "…" : `${storyCount} / ${limit}`}
          </span>
        </div>
        {!isPaid && usage !== null && (
          <div style={{ marginTop: 12, height: 6, background: "#F3F4F6", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.min(100, (storyCount / 3) * 100)}%`, background: storyCount >= 3 ? "#EF4444" : "#7C5CFC", borderRadius: 999, transition: "width .4s" }} />
          </div>
        )}
      </div>

      {/* Active devices */}
      {devices.length > 0 && (
        <div style={card}>
          <div style={label}>Active devices</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {devices.map(s => {
              const { icon, name } = deviceLabel(s.latestActivity);
              const isCurrent = s.id === currentSession?.id;
              return (
                <div key={s.id} style={{ ...row, gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{name}</span>
                        {isCurrent && (
                          <span style={{ fontSize: 10, fontWeight: 800, color: "#7C5CFC", background: "#F5F3FF", padding: "2px 8px", borderRadius: 999 }}>
                            This device
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                        {relativeTime(new Date(s.lastActiveAt))}
                      </div>
                    </div>
                  </div>
                  {!isCurrent && (
                    <button
                      onClick={() => handleRevokeSession(s)}
                      disabled={revokingId === s.id}
                      style={{ background: "none", color: "#9CA3AF", border: "1.5px solid #ECECEC", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}
                    >
                      {revokingId === s.id ? "…" : "Sign out"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Data & Privacy */}
      <div style={card}>
        <div style={label}>Data &amp; Privacy</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={row}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Export my data</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Download all your stories as JSON</div>
            </div>
            <button
              onClick={handleExport}
              disabled={exporting}
              style={{ background: "#F5F3FF", color: "#7C5CFC", border: "1.5px solid #E0D9FF", padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              {exporting ? "Exporting…" : "Export"}
            </button>
          </div>
          <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 12, ...row }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#EF4444" }}>Delete account</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Permanently deletes all your data</div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              style={{ background: "#FEF2F2", color: "#EF4444", border: "1.5px solid #FECACA", padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
            >
              Delete account
            </button>
          </div>
        </div>
      </div>

      {/* Log out */}
      <div style={{ textAlign: "center", paddingTop: 8 }}>
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          style={{ fontSize: 13, color: "#9CA3AF", cursor: "pointer", background: "none", border: "none", textDecoration: "underline" }}
        >
          Log out
        </button>
      </div>

      {/* Delete account modal */}
      {showDeleteModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, maxWidth: 420, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
            <div style={{ fontSize: 24, marginBottom: 12 }}>⚠️</div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Delete your account?</h2>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, marginBottom: 20 }}>
              This will permanently delete all your saved stories, usage history, and account. This cannot be undone.
            </p>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Type <strong>DELETE</strong> to confirm:</p>
            <input
              type="text"
              value={deleteInput}
              onChange={e => setDeleteInput(e.target.value)}
              placeholder="DELETE"
              style={{ width: "100%", border: "1.5px solid #ECECEC", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", marginBottom: 16, borderColor: deleteInput === "DELETE" ? "#EF4444" : "#ECECEC" }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteInput(""); }}
                style={{ flex: 1, background: "#F9FAFB", color: "#374151", border: "1.5px solid #ECECEC", padding: "10px 0", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteInput !== "DELETE" || deleting}
                style={{ flex: 1, background: deleteInput === "DELETE" ? "#EF4444" : "#F3F4F6", color: deleteInput === "DELETE" ? "#fff" : "#9CA3AF", border: "none", padding: "10px 0", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: deleteInput === "DELETE" ? "pointer" : "not-allowed", transition: "all .2s" }}
              >
                {deleting ? "Deleting…" : "Delete forever"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
