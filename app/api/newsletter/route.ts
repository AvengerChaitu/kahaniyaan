import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("newsletter_subscribers")
    .upsert({ email: email.toLowerCase().trim(), subscribed_at: new Date() }, { onConflict: "email" });

  if (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Could not subscribe. Try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
