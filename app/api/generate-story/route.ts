import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { name, age, language, theme } = await req.json();

    if (!name || !age || !language || !theme) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check free tier limit
    const { userId } = await auth();
    if (userId) {
      const user = await currentUser();
      const email = user?.emailAddresses?.[0]?.emailAddress;

      // Bypass limit for test account
      const isTestUser = email === "dsrchaitu007@gmail.com";

      if (!isTestUser) {
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        const { data: usage } = await supabaseAdmin
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
    }

    // Map UI age format to DB format
    const ageGroup = age.replace(" yrs", "").replace("–", "-");

    // Fetch matching stories from database
    const { data: templates, error } = await supabaseAdmin
      .from("story_templates")
      .select("*")
      .eq("language", language)
      .eq("age_group", ageGroup)
      .eq("theme", theme);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (!templates || templates.length === 0) {
      return NextResponse.json(
        { error: `No stories available for ${language}/${theme}. New stories coming soon!` },
        { status: 404 }
      );
    }

    // Pick a random story
    const template = templates[Math.floor(Math.random() * templates.length)];

    // Replace placeholders
    const title = template.title.replace(/\{childname\}/g, name);
    const body = template.body.replace(/\{childname\}/g, name);

    // Track usage for logged-in users
    if (userId) {
      const now = new Date();
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

      const { data: existing } = await supabaseAdmin
        .from("user_usage")
        .select("*")
        .eq("clerk_user_id", userId)
        .eq("month", month)
        .single();

      if (existing) {
        await supabaseAdmin
          .from("user_usage")
          .update({ story_count: existing.story_count + 1, updated_at: new Date() })
          .eq("id", existing.id);
      } else {
        await supabaseAdmin
          .from("user_usage")
          .insert({ clerk_user_id: userId, story_count: 1, month, is_paid: false });
      }
    }

    return NextResponse.json({ title, body });
  } catch (error) {
    console.error("Story fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch story" }, { status: 500 });
  }
}
