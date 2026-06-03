"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClerkProvider, Show, SignInButton, UserButton, SignOutButton } from "@clerk/nextjs";
import { Playfair_Display, Lora, Dancing_Script } from "next/font/google";
import { useEffect, useState } from "react";
import { BottomNav } from "./nav-client";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-sans",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${dancingScript.variable}`}>
      <body className="min-h-dvh flex flex-col bg-[#fdf4e3] font-sans antialiased">
        <ClerkProvider>
          <nav className={`navbar${scrolled ? " solid" : ""}`}>
            <Link className="logo" href="/">Dadi<em>ma</em></Link>
            {!isAuthPage && (
              <ul className="nav-links">
                <li><Link className="nav-link" href="/#themes">Themes</Link></li>
                <li><Link className="nav-link" href="/#generator">Try it</Link></li>
                <li><Link className="nav-link" href="/#pricing">Pricing</Link></li>
                <li><Link className="nav-link" href="/library">Library</Link></li>
              </ul>
            )}
            {!isAuthPage && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button className="nav-signin">Sign in</button>
                    </SignInButton>
                  </Show>
                  <Show when="signed-in">
                    <div className="nav-user-wrap">
                      <UserButton />
                      <SignOutButton redirectUrl="/">
                        <button className="nav-signin" style={{ padding: "0.4rem 1rem", fontSize: "0.78rem" }}>
                          Log out
                        </button>
                      </SignOutButton>
                    </div>
                  </Show>
                </div>
                <button className={`hamburger-btn${menuOpen ? " open" : ""}`}
                  onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
                  <span></span>
                </button>
              </>
            )}
            {menuOpen && (
              <div className="mobile-overlay" onClick={() => setMenuOpen(false)}>
                <a href="/#themes" onClick={() => setMenuOpen(false)}>Themes</a>
                <a href="/#generator" onClick={() => setMenuOpen(false)}>Try it</a>
                <a href="/#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
                <a href="/library" onClick={() => setMenuOpen(false)}>Library</a>
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button onClick={() => setMenuOpen(false)}>Sign in</button>
                  </SignInButton>
                </Show>
              </div>
            )}
          </nav>
          <main className="flex-1">
            {children}
          </main>
          {!isAuthPage && <BottomNav />}
        </ClerkProvider>
      </body>
    </html>
  );
}
