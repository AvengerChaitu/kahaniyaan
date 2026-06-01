import { getOpenAI } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, age, language, theme } = await req.json();

    if (!name || !age || !language || !theme) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prompt = `Write a short, engaging bedtime story for a ${age}-year-old Indian child named ${name}. The story should be in ${language} and follow the theme of "${theme}". The child ${name} should be the hero of the story. The story should be culturally rooted in Indian traditions, values, and storytelling style. Keep it age-appropriate, warm, and moral-driven. Output the story with a title on the first line, then a blank line, then the story body. The title should be in English. The story body should be in ${language}.`;

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content || "";
    const lines = content.split("\n").filter((l) => l.trim());
    const title = lines[0]?.replace(/^["*#]+|["*#]+$/g, "").trim() || `${name}'s ${theme} Adventure`;
    const body = lines.slice(1).join("\n\n").trim();

    return NextResponse.json({ title, body });
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json({ error: "Failed to generate story" }, { status: 500 });
  }
}
