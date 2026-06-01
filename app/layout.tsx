import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { BottomNav } from "./nav-client";
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
      <body className="min-h-dvh flex flex-col bg-[#faf7f2] font-sans antialiased">
        <ClerkProvider>
          <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-[#e2ddd4] bg-white px-4">
            <Link href="/" className="flex items-center gap-2 font-serif text-lg font-medium no-underline text-[#1a1a1a]">
              <span className="size-2.5 rounded-full bg-[#c17f2a]" />
              Kahaniyan
            </Link>
            <div className="flex items-center gap-2">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="btn btn-ghost btn-sm text-sm text-[#1a1a1a]">Sign in</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn btn-sm text-sm bg-[#c17f2a] text-white hover:bg-[#a66c22] border-none">Start free</button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>
          <main className="flex-1 mx-auto w-full max-w-2xl pb-20">
            {children}
          </main>
          <BottomNav />
        </ClerkProvider>
      </body>
    </html>
  );
}
