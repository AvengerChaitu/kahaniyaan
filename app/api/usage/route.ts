import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const { data } = await supabase
    .from("user_usage")
    .select("story_count, is_paid")
    .eq("clerk_user_id", userId)
    .eq("month", month)
    .single();

  return NextResponse.json({
    story_count: data?.story_count ?? 0,
    is_paid: data?.is_paid ?? false,
    month,
  });
}
