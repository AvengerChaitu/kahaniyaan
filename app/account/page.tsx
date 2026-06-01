"use client";

import { useUser, Show, SignInButton, UserButton } from "@clerk/nextjs";

export default function AccountPage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return (
      <div className="p-4">
        <div className="card bg-base-100 border border-base-300 rounded-xl p-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 text-base-content/30"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
            <p className="text-sm text-base-content/60">Sign in to manage your account</p>
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
      <div className="card bg-base-100 border border-base-300 rounded-xl p-5 flex items-center gap-4">
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-amber-200 ring-offset-base-100 ring-offset-2">
            <UserButton />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">{user?.fullName || user?.primaryEmailAddress?.emailAddress}</p>
          <p className="text-xs text-base-content/60">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-300 rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-medium">Plan</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">Free</p>
            <p className="text-xs text-base-content/60">3 stories per month</p>
          </div>
          <button className="btn btn-sm bg-[#c17f2a] text-white hover:bg-[#a66c22] border-none">Upgrade</button>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-300 rounded-xl p-5 space-y-2">
        <h2 className="text-sm font-medium">Usage</h2>
        <div className="flex justify-between text-sm">
          <span className="text-base-content/60">Stories used this month</span>
          <span>0 / 3</span>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button className="text-xs text-base-content/40 hover:text-base-content/60">Log out</button>
      </div>
    </div>
  );
}
