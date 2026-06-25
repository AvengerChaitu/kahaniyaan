import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const format = req.nextUrl.searchParams.get("format") ?? "json"; // ?format=csv

  const { data: stories, error } = await supabaseAdmin
    .from("stories")
    .select("*")
    .eq("clerk_user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: error.message ?? "Failed to export stories" }, { status: 500 });
  }

  const rows = stories ?? [];

  if (format === "csv") {
    const headers = ["title", "child_name", "age", "language", "theme", "moral", "created_at", "body"];
    // only export user-facing columns (skip id, clerk_user_id)
    const escape  = (v: string | null | undefined) =>
      v == null ? "" : `"${String(v).replace(/"/g, '""').replace(/\n/g, " ")}"`;

    const csv = [
      headers.join(","),
      ...rows.map(s =>
        headers.map(h => escape(s[h as keyof typeof s] as string)).join(",")
      ),
    ].join("\r\n");

    // BOM tells Excel/Numbers to interpret the file as UTF-8 (needed for Indic scripts)
    const BOM = "﻿";
    return new NextResponse(BOM + csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="dadima-stories.csv"',
      },
    });
  }

  // Default: JSON
  const exportData = {
    exported_at:   new Date().toISOString(),
    total_stories: rows.length,
    stories:       rows,
  };

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="dadima-stories.json"',
    },
  });
}
