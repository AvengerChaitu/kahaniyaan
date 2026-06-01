"use client";

import { useEffect, useState } from "react";
import { useUser, Show, SignInButton } from "@clerk/nextjs";

interface Story {
  id: number;
  title: string;
  body: string;
  language: string;
  theme: string;
  child_name: string;
  age: string;
  created_at: string;
}

export default function LibraryPage() {
  const { isSignedIn } = useUser();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/stories")
        .then((r) => r.json())
        .then((data) => {
          if (data.stories) setStories(data.stories);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <div className="p-4">
        <div className="card bg-base-100 border border-base-300 rounded-xl p-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 text-base-content/30"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
            <p className="text-sm text-base-content/60">Sign in to view your story library</p>
            <SignInButton mode="modal">
              <button className="btn btn-sm bg-[#c17f2a] text-white hover:bg-[#a66c22] border-none">Sign in</button>
            </SignInButton>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 flex justify-center pt-12">
        <span className="loading loading-spinner loading-md text-amber-600" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-medium">Your stories</h1>
        <span className="text-xs bg-base-300 text-base-content/60 px-2.5 py-1 rounded-full">{stories.length} saved</span>
      </div>

      {selectedStory ? (
        <div className="card bg-base-100 border border-base-300 rounded-xl p-5">
          <button onClick={() => setSelectedStory(null)} className="text-xs text-base-content/40 hover:text-base-content mb-3 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to library
          </button>
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="px-2.5 py-1 text-xs rounded-full bg-amber-50 border border-amber-300 text-amber-800">{selectedStory.language}</span>
            <span className="px-2.5 py-1 text-xs rounded-full bg-amber-50 border border-amber-300 text-amber-800">{selectedStory.theme}</span>
            <span className="px-2.5 py-1 text-xs rounded-full bg-amber-50 border border-amber-300 text-amber-800">{selectedStory.child_name} · {selectedStory.age} yrs</span>
          </div>
          <h2 className="text-base font-medium mb-2">{selectedStory.title}</h2>
          <div className="text-sm text-base-content/70 leading-relaxed whitespace-pre-line">{selectedStory.body}</div>
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-base-300">
            <span className="text-xs text-base-content/40">{new Date(selectedStory.created_at).toLocaleDateString()}</span>
            <button className="btn btn-ghost btn-xs gap-1" onClick={() => window.print()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              PDF
            </button>
          </div>
        </div>
      ) : stories.length === 0 ? (
        <div className="card bg-base-100 border border-dashed border-base-300 rounded-xl p-8 text-center">
          <p className="text-sm text-base-content/60">No stories saved yet. Generate a story and save it here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {stories.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStory(s)}
              className="card bg-base-100 border border-base-300 rounded-xl p-4 text-left cursor-pointer hover:border-amber-300 transition-all"
            >
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 inline-block mb-2 w-fit">
                {s.language} · {s.theme}
              </span>
              <h3 className="text-sm font-medium mb-1 line-clamp-1">{s.title}</h3>
              <p className="text-xs text-base-content/50 line-clamp-2">{s.body}</p>
              <p className="text-xs text-base-content/40 mt-2">{s.child_name} · {s.age} yrs</p>
            </button>
          ))}
          <div className="card bg-base-200 border border-dashed border-base-300 rounded-xl p-5 text-center flex items-center justify-center">
            <div>
              <p className="text-xs text-base-content/60 mb-2">Upgrade to ₹99/month for unlimited saves</p>
              <button className="btn btn-xs bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100">Upgrade plan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
