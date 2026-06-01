import { ClerkProvider, Show, SignInButton, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
          <header className="sticky top-0 z-50 h-[60px] bg-[#1a0a2e] flex items-center justify-between px-4 md:px-8">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-8 h-8 bg-[#E8812A] rounded-lg flex items-center justify-center text-lg shrink-0">
                📖
              </div>
              <span className="text-xl font-medium text-[#FFF8F0] tracking-wide">
                Kahani<span className="text-[#E8812A]">yaan</span>
              </span>
            </Link>
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/" className="text-[#c9b8d8] text-sm no-underline hidden sm:inline hover:text-white transition-colors">Stories</Link>
              <Link href="/library" className="text-[#c9b8d8] text-sm no-underline hidden sm:inline hover:text-white transition-colors">Library</Link>
              <Link href="/account" className="text-[#c9b8d8] text-sm no-underline hidden sm:inline hover:text-white transition-colors">Account</Link>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="bg-[#E8812A] text-white border-none px-[18px] py-2 rounded-[20px] text-sm cursor-pointer font-medium hover:bg-[#d07222] transition-colors">
                    Sign in
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
