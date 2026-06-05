import { auth, currentUser } from "@clerk/nextjs/server";
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

  // Check free tier limit (same as generate-story route)
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const isTestUser = email === "dsrchaitu007@gmail.com";

  if (!isTestUser) {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const { data: usage } = await supabase
      .from("user_usage")
      .select("*")
      .eq("clerk_user_id", userId)
      .eq("month", month)
      .single();

    if (usage && !usage.is_paid && usage.story_count >= 3) {
      return NextResponse.json(
        { error: "Free limit reached. Upgrade to ₹99/month for unlimited stories.", code: "UPGRADE_REQUIRED" },
        { status: 403 }
      );
    }
  }

  try {
    const { title, body, language, theme, child_name, age, moral } = await req.json();

    const { data, error } = await supabase.from("stories").insert({
      clerk_user_id: userId,
      title,
      body,
      language,
      theme,
      child_name,
      age,
      moral,
    }).select().single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to save story" }, { status: 500 });
    }

    // Track usage (same as generate route)
    if (!isTestUser) {
      const now = new Date();
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      const { data: existing } = await supabase
        .from("user_usage")
        .select("*")
        .eq("clerk_user_id", userId)
        .eq("month", month)
        .single();
      if (existing) {
        await supabase
          .from("user_usage")
          .update({ story_count: existing.story_count + 1, updated_at: new Date() })
          .eq("id", existing.id);
      } else {
        await supabase
          .from("user_usage")
          .insert({ clerk_user_id: userId, story_count: 1, month, is_paid: false });
      }
    }

    return NextResponse.json({ story: data });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ error: "Failed to save story" }, { status: 500 });
  }
}
