"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Create", icon: "sparkles" },
  { href: "/library", label: "Library", icon: "books" },
  { href: "/account", label: "Account", icon: "user" },
];

export function BottomNav() {
  const pathname = usePathname();

  function TabIcon({ icon }: { icon: string }) {
    switch (icon) {
      case "sparkles":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M12 2l2 7h7l-5 4 2 7-6-4-6 4 2-7-5-4h7z"/></svg>
        );
      case "books":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 19.5z"/><path d="M8 2v20"/><path d="M12 6h4"/><path d="M12 10h4"/><path d="M12 14h4"/></svg>
        );
      case "user":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
        );
    }
  }

  return (
    <nav className="btm-nav btm-nav-md z-50"
      style={{
        borderTop: "1px solid rgba(240,163,0,.12)",
        background: "rgba(11,9,32,.96)",
        backdropFilter: "blur(12px)",
      }}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${isActive ? "text-[#f0a300]" : "text-[rgba(253,244,227,.5)]"}`}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "2px", textDecoration: "none", padding: "8px 0",
              transition: "color 0.2s"
            }}>
            <TabIcon icon={tab.icon} />
            <span style={{ fontSize: "11px", fontWeight: 600 }}>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
