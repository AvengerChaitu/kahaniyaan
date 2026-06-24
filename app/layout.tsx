"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClerkProvider, Show, SignInButton, UserButton, SignOutButton } from "@clerk/nextjs";
import { Pacifico, Plus_Jakarta_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import "./globals.css";

const pacifico = Pacifico({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname                  = usePathname();
  const isAuthPage = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <html lang="en" className={`${pacifico.variable} ${plusJakarta.variable}`}>
      <body style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "#FFFBF6" }}>
        <ClerkProvider>
          {!isAuthPage && (
            <nav className={`dm-nav${scrolled ? " dm-nav--scrolled" : ""}`}>
              <Link href="/" className="dm-logo">
                Dadi<span className="dm-logo-accent">Ma</span><span className="dm-logo-emoji">🪔</span>
              </Link>

              <div className="dm-nav-links">
                <Link href="/#themes">Stories</Link>
                <Link href="/#languages">Languages</Link>
                <Link href="/#pricing">Pricing</Link>
                <Link href="/library">Library</Link>
              </div>

              <div className="dm-nav-actions">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="dm-btn-text">Login</button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <button className="dm-btn-primary">Start free</button>
                  </SignInButton>
                </Show>
                <Show when="signed-in">
                  <Link href="/library" className="dm-btn-text" style={{ textDecoration: "none" }}>Library</Link>
                  <UserButton />
                  <SignOutButton redirectUrl="/">
                    <button className="dm-btn-text">Log out</button>
                  </SignOutButton>
                </Show>
              </div>

              <button
                className={`hamburger-btn${menuOpen ? " open" : ""}`}
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Menu"
              >
                <span />
              </button>

              {menuOpen && (
                <div className="mobile-overlay" onClick={() => setMenuOpen(false)}>
                  <Link href="/#themes"     onClick={() => setMenuOpen(false)}>Stories</Link>
                  <Link href="/#languages"  onClick={() => setMenuOpen(false)}>Languages</Link>
                  <Link href="/#pricing"    onClick={() => setMenuOpen(false)}>Pricing</Link>
                  <Link href="/library"     onClick={() => setMenuOpen(false)}>Library</Link>
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button className="dm-btn-primary" onClick={() => setMenuOpen(false)}>Start free</button>
                    </SignInButton>
                  </Show>
                  <Show when="signed-in">
                    <SignOutButton redirectUrl="/">
                      <button className="dm-btn-outline" onClick={() => setMenuOpen(false)}>Log out</button>
                    </SignOutButton>
                  </Show>
                </div>
              )}
            </nav>
          )}

          <main style={{ flex: 1 }}>
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
