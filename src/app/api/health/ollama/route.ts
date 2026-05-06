import { NextResponse } from "next/server";
import { checkOllamaHealth, getOllamaConfig } from "@/lib/ai/ollamaClient";

export const runtime = "nodejs";

export async function GET() {
  const { baseUrl, model } = getOllamaConfig();
  const health = await checkOllamaHealth();

  if (!health.ok) {
    return NextResponse.json({
      ok: false,
      model,
      baseUrl,
      error: health.error
    }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    model,
    baseUrl
  });
}
