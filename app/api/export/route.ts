import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: stories } = await supabase
    .from("stories")
    .select("title, body, language, theme, child_name, age, moral, created_at")
    .eq("clerk_user_id", userId)
    .order("created_at", { ascending: false });

  const exportData = {
    exported_at: new Date().toISOString(),
    total_stories: stories?.length ?? 0,
    stories: stories ?? [],
  };

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="dadima-stories.json"',
    },
  });
}
