import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
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
      <body className="min-h-dvh flex flex-col bg-base-200 font-sans antialiased">
        <ClerkProvider>
          <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-base-300 bg-base-100 px-4">
            <Link href="/" className="flex items-center gap-2 font-serif text-lg font-medium no-underline text-base-content">
              <span className="size-2 rounded-full bg-[#c17f2a] shadow-sm" />
              Kahaniyan
            </Link>
            <div className="flex items-center gap-2">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="btn btn-ghost btn-sm">Sign in</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn btn-sm bg-[#c17f2a] text-white hover:bg-[#a66c22] border-none">Start free</button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </header>
          <main className="flex-1 mx-auto w-full max-w-2xl">
            {children}
          </main>
          <nav className="btm-nav btm-nav-md border-t border-base-300 bg-base-100 z-50">
            <Link href="/" className="text-base-content/60 [&.active]:text-[#c17f2a] [&.active]:font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M12 2l2 7h7l-5 4 2 7-6-4-6 4 2-7-5-4h7z"/></svg>
              <span className="btm-nav-label text-xs">Create</span>
            </Link>
            <Link href="/library" className="text-base-content/60 [&.active]:text-[#c17f2a] [&.active]:font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 19.5z"/><path d="M8 2v20"/><path d="M12 6h4"/><path d="M12 10h4"/><path d="M12 14h4"/></svg>
              <span className="btm-nav-label text-xs">Library</span>
            </Link>
            <Link href="/account" className="text-base-content/60 [&.active]:text-[#c17f2a] [&.active]:font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
              <span className="btm-nav-label text-xs">Account</span>
            </Link>
          </nav>
        </ClerkProvider>
      </body>
    </html>
  );
}
