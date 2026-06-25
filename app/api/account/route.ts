import { auth, clerkClient } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// POST { action: "cancel" } — cancel subscription
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { action } = await req.json();
  if (action !== "cancel") return NextResponse.json({ error: "Unknown action" }, { status: 400 });

  await supabaseAdmin
    .from("user_usage")
    .update({ is_paid: false, updated_at: new Date() })
    .eq("clerk_user_id", userId);

  return NextResponse.json({ success: true });
}

// DELETE — delete account (all data + Clerk user)
export async function DELETE() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await supabaseAdmin.from("stories").delete().eq("clerk_user_id", userId);
  await supabaseAdmin.from("user_usage").delete().eq("clerk_user_id", userId);

  const clerk = await clerkClient();
  await clerk.users.deleteUser(userId);

  return NextResponse.json({ success: true });
}
