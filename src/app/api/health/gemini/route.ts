import { NextResponse } from "next/server";
import { checkGeminiHealth, getGeminiConfig } from "@/lib/ai/geminiClient";

export const runtime = "nodejs";

export async function GET() {
  const { model } = getGeminiConfig();
  const health = await checkGeminiHealth();

  if (!health.ok) {
    return NextResponse.json({
      ok: false,
      provider: "gemini",
      model,
      error: health.error
    }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    provider: "gemini",
    model
  });
}
