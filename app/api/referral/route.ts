import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

// GET /api/referral  — get or create this user's referral code + stats
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Look for an existing referral row owned by this user
  const { data: existing } = await supabaseAdmin
    .from("referrals")
    .select("code, status, bonus_stories, completed_at")
    .eq("referrer_id", userId)
    .order("created_at", { ascending: true });

  // Generate a new code if none exists yet
  if (!existing || existing.length === 0) {
    const code = nanoid(7).toLowerCase();
    await supabaseAdmin.from("referrals").insert({
      referrer_id: userId,
      code,
    });
    return NextResponse.json({ code, referrals: [] });
  }

  // Return the first (canonical) code + all completed referrals
  const code     = existing[0].code;
  const completed = existing.filter(r => r.status === "completed");
  return NextResponse.json({ code, referrals: completed });
}

// POST /api/referral  — called after sign-up to credit the referrer
// body: { code }
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { code } = await req.json();
  if (!code) return NextResponse.json({ error: "No code" }, { status: 400 });

  // Find the referral row for this code
  const { data: referral } = await supabaseAdmin
    .from("referrals")
    .select("*")
    .eq("code", code)
    .single();

  if (!referral) return NextResponse.json({ error: "Invalid code" }, { status: 404 });

  // Don't let someone refer themselves
  if (referral.referrer_id === userId) {
    return NextResponse.json({ error: "Cannot use your own referral link" }, { status: 400 });
  }

  // Check if this referee already used any referral
  const { data: alreadyUsed } = await supabaseAdmin
    .from("referrals")
    .select("id")
    .eq("referee_id", userId)
    .single();

  if (alreadyUsed) {
    return NextResponse.json({ error: "Already used a referral" }, { status: 400 });
  }

  // Mark this referral as completed with this referee
  await supabaseAdmin
    .from("referrals")
    .update({ referee_id: userId, status: "completed", bonus_stories: 3, completed_at: new Date() })
    .eq("id", referral.id);

  // Give the referrer +3 bonus stories this month
  const now   = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const { data: usage } = await supabaseAdmin
    .from("user_usage")
    .select("*")
    .eq("clerk_user_id", referral.referrer_id)
    .eq("month", month)
    .single();

  if (usage) {
    // Reduce story_count by 3 (effectively gives 3 more free slots)
    const newCount = Math.max(0, usage.story_count - 3);
    await supabaseAdmin
      .from("user_usage")
      .update({ story_count: newCount })
      .eq("id", usage.id);
  } else {
    // Referrer hasn't generated this month — give them negative balance (credit)
    await supabaseAdmin
      .from("user_usage")
      .insert({ clerk_user_id: referral.referrer_id, story_count: -3, month, is_paid: false });
  }

  return NextResponse.json({ success: true });
}
