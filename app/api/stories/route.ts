import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("clerk_user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }

  return NextResponse.json({ stories: data });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, body, language, theme, child_name, age } = await req.json();

    const { data, error } = await supabase.from("stories").insert({
      clerk_user_id: userId,
      title,
      body,
      language,
      theme,
      child_name,
      age,
    }).select().single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to save story" }, { status: 500 });
    }

    return NextResponse.json({ story: data });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ error: "Failed to save story" }, { status: 500 });
  }
}
