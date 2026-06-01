"use client";

import { useUser, Show, SignInButton, UserButton } from "@clerk/nextjs";

export default function AccountPage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return (
      <div className="p-4">
        <div className="bg-white border border-[#e2ddd4] rounded-xl p-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 text-[#bbb5aa]"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
            <p className="text-sm text-[#8a8580]">Sign in to manage your account</p>
            <SignInButton mode="modal">
              <button className="btn btn-sm bg-[#c17f2a] text-white hover:bg-[#a66c22] border-none">Sign in</button>
            </SignInButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="bg-white border border-[#e2ddd4] rounded-xl p-5 flex items-center gap-4">
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-[#e8c882] ring-offset-2 ring-offset-[#faf7f2]">
            <UserButton />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-[#1a1a1a]">{user?.fullName || user?.primaryEmailAddress?.emailAddress}</p>
          <p className="text-xs text-[#8a8580]">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>

      <div className="bg-white border border-[#e2ddd4] rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-medium text-[#1a1a1a]">Plan</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#1a1a1a]">Free</p>
            <p className="text-xs text-[#8a8580]">3 stories per month</p>
          </div>
          <button className="btn btn-sm bg-[#c17f2a] text-white hover:bg-[#a66c22] border-none">Upgrade</button>
        </div>
      </div>

      <div className="bg-white border border-[#e2ddd4] rounded-xl p-5 space-y-2">
        <h2 className="text-sm font-medium text-[#1a1a1a]">Usage</h2>
        <div className="flex justify-between text-sm">
          <span className="text-[#8a8580]">Stories used this month</span>
          <span className="text-[#1a1a1a]">0 / 3</span>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button className="text-xs text-[#bbb5aa] hover:text-[#8a8580] cursor-pointer">Log out</button>
      </div>
    </div>
  );
}
