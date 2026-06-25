import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getTerm } from "@/lib/tts-terms";
import { createHash } from "crypto";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

// In-memory IP rate limiter: 5 requests per 10 minutes per IP
const ipRateMap = new Map<string, { count: number; resetAt: number }>();
function checkIpRate(ip: string): boolean {
  const now    = Date.now();
  const window = 10 * 60 * 1000; // 10 min
  const limit  = 5;
  const entry  = ipRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRateMap.set(ip, { count: 1, resetAt: now + window });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

function computeTtsUrl(body: string, language: string): string {
  const hash = createHash("md5").update(`${language}:${body}`).digest("hex");
  return `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/tts/${language}/${hash}.mp3`;
}

export async function POST(req: NextRequest) {
  // IP-based rate limit (protects against unauthenticated / burst abuse)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkIpRate(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  try {
    const { name, age, language, theme, excludeIds } = await req.json();

    if (!name || !age || !language || !theme) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check free tier limit
    const { userId } = await auth();
    if (userId) {
      const user = await currentUser();
      const email = user?.emailAddresses?.[0]?.emailAddress;

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

    // Fetch all matching stories for this language + theme
    const { data: allTemplates, error } = await supabaseAdmin
      .from("story_templates")
      .select("*")
      .eq("language", language)
      .eq("theme", theme);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (!allTemplates || allTemplates.length === 0) {
      return NextResponse.json(
        { error: `No stories available for ${language}/${theme}. New stories coming soon!` },
        { status: 404 }
      );
    }

    // Exclude already-seen IDs; if all are seen, cycle (reset exclusions)
    const seenSet = new Set(Array.isArray(excludeIds) ? excludeIds : []);
    let pool = allTemplates.filter(t => !seenSet.has(t.id));
    const cycled = pool.length === 0;
    if (cycled) pool = allTemplates; // full reset

    // Pick a random story from the remaining pool
    const template = pool[Math.floor(Math.random() * pool.length)];

    // Replace placeholders
    const title = template.title.replace(/\{childname\}/g, name);
    const term = getTerm(language);
    const body = template.body.replace(/\{childname\}/g, term);
    const moral = template.moral || "";

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

    return NextResponse.json({ title, body, moral, templateId: template.id, ttsUrl: computeTtsUrl(template.body, language), cycled });
  } catch (error) {
    console.error("Story fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch story" }, { status: 500 });
  }
}
