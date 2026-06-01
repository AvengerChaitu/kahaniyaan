import { getGeminiModel } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";

async function generateWithRetry(prompt: string, maxRetries = 3): Promise<string> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const model = getGeminiModel();
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error: any) {
      if (error?.status === 429 && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        console.warn(`Gemini 429 (attempt ${attempt}/${maxRetries}), retrying in ${delay}ms`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}

export async function POST(req: NextRequest) {
  try {
    const { name, age, language, theme } = await req.json();

    if (!name || !age || !language || !theme) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prompt = `Write a short, engaging bedtime story for a ${age}-year-old Indian child named ${name}. The story should be in ${language} and follow the theme of "${theme}". The child ${name} should be the hero of the story. The story should be culturally rooted in Indian traditions, values, and storytelling style. Keep it age-appropriate, warm, and moral-driven. Output the story with a title on the first line, then a blank line, then the story body. The title should be in English. The story body should be in ${language}.`;

    const content = await generateWithRetry(prompt);

    const lines = content.split("\n").filter((l) => l.trim());
    const title = lines[0]?.replace(/^["*#]+|["*#]+$/g, "").trim() || `${name}'s ${theme} Adventure`;
    const body = lines.slice(1).join("\n\n").trim();

    return NextResponse.json({ title, body });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json({ error: "Failed to generate story" }, { status: 500 });
  }
}
