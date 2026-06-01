import { ClerkProvider, Show, SignInButton, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kahaniyan — AI Stories for Indian Kids",
  description: "Personalized Indian bedtime stories in 10+ languages",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh flex flex-col bg-white font-sans antialiased">
        <ClerkProvider>
          <nav className="navbar">
            <a className="logo" href="/">
              <div className="logo-box">📖</div>
              <div className="logo-wordmark">Kahani<span>yaan</span></div>
            </a>
            <div className="nav-links">
              <a className="nav-link" href="#stories">Stories</a>
              <a className="nav-link" href="#pricing">Pricing</a>
              <a className="nav-link" href="/library">Library</a>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="nav-signin">Sign in</button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </nav>
          <main className="flex-1">
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
