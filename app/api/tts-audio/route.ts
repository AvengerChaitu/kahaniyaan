import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { uploadBuffer, getCachedUrl, checkResourceExists } from "@/lib/cloudinary";
import { getTerm } from "@/lib/tts-terms";

const HF_API_BASE = "https://Chaitanyadasari99-daadima.hf.space";

function hashKey(text: string, lang: string): string {
  return createHash("md5").update(`${lang}:${text}`).digest("hex");
}

function splitChunks(text: string, maxWords = 30): string[] {
  const sentences = text
    .split(/(?<=[.!?।])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const chunks: string[] = [];
  for (const s of sentences) {
    const words = s.split(/\s+/);
    if (words.length <= maxWords) {
      chunks.push(s);
    } else {
      for (let i = 0; i < words.length; i += maxWords) {
        chunks.push(words.slice(i, i + maxWords).join(" "));
      }
    }
  }
  return chunks;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text");
    const language = searchParams.get("lang");

    if (!text || !language) {
      return NextResponse.json({ error: "Missing text or lang" }, { status: 400 });
    }

    const term = getTerm(language);
    const ttsText = text.replace(/\{childname\}/g, term);

    const chunks = splitChunks(ttsText.replace(/<[^>]*>/g, ""));
    if (chunks.length === 0) {
      return NextResponse.json({ error: "No text to speak" }, { status: 400 });
    }

    const urls: string[] = [];

    for (const chunk of chunks) {
      const h = hashKey(chunk, language);
      const publicId = `tts/${language}/${h}`;

      const cachedUrl = getCachedUrl(language, h);
      const exists = await checkResourceExists(publicId);

      if (exists) {
        urls.push(cachedUrl);
      } else {
        const hfUrl = `${HF_API_BASE}/tts?text=${encodeURIComponent(chunk)}&lang=${encodeURIComponent(language)}`;
        const res = await fetch(hfUrl);

        if (!res.ok) {
          urls.push("");
          continue;
        }

        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadedUrl = await uploadBuffer(buffer, publicId);
        urls.push(uploadedUrl);
      }
    }

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("TTS audio error:", error);
    return NextResponse.json({ error: "Failed to process audio" }, { status: 500 });
  }
}
