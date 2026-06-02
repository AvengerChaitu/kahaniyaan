import Link from "next/link";
import { ClerkProvider, Show, SignInButton, UserButton, SignOutButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kahaniyan — AI Stories for Indian Kids",
  description: "Personalized Indian bedtime stories in 10+ languages",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable}`}>
      <body className="min-h-dvh flex flex-col bg-[#fdf7f0] font-sans antialiased">
        <ClerkProvider>
          <nav className="navbar">
            <Link className="logo" href="/">Kahani<span>yaan</span></Link>
            <div className="nav-links">
              <Link className="nav-link" href="/#stories">Themes</Link>
              <Link className="nav-link" href="/#generator">Try it</Link>
              <Link className="nav-link" href="/#pricing">Pricing</Link>
              <Link className="nav-link" href="/library">Library</Link>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="nav-signin">Sign in</button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
                <SignOutButton redirectUrl="/">
                  <button className="nav-signout">Sign out</button>
                </SignOutButton>
              </Show>
            </div>
          </nav>
          <main className="flex-1 pt-[62px]">
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
