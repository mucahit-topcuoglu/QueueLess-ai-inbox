import { GoogleGenAI } from "@google/genai";
import { parseJsonSafely } from "./safeJson.ts";

const DEFAULT_MODEL = "gemini-2.5-flash";
const DEFAULT_TIMEOUT_MS = 60000;

export type GeminiJsonRequest = {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  timeoutMs?: number;
};

export class GeminiRequestError extends Error {
  constructor(message = "Gemini API çağrısı tamamlanamadı.") {
    super(message);
    this.name = "GeminiRequestError";
  }
}

export function getGeminiConfig() {
  return {
    hasApiKey: Boolean(process.env.GEMINI_API_KEY?.trim()),
    model: process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL
  };
}

export async function callGeminiJson<T>({
  systemPrompt,
  userPrompt,
  temperature = 0.1,
  timeoutMs = DEFAULT_TIMEOUT_MS
}: GeminiJsonRequest): Promise<T> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;

  if (!apiKey) {
    throw new GeminiRequestError("GEMINI_API_KEY tanımlı değil.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await withTimeout(ai.models.generateContent({
      model,
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature
      }
    }), timeoutMs);
    const responseText = response.text ?? "";

    if (!responseText.trim()) {
      throw new GeminiRequestError("Gemini boş yanıt döndürdü.");
    }

    return parseJsonSafely<T>(responseText);
  } catch (error) {
    if (error instanceof GeminiRequestError) {
      throw error;
    }

    throw new GeminiRequestError("Gemini API çağrısı tamamlanamadı.");
  }
}

export async function checkGeminiHealth(): Promise<{ ok: true } | { ok: false; error: string }> {
  const { hasApiKey } = getGeminiConfig();

  if (!hasApiKey) {
    return { ok: false, error: "GEMINI_API_KEY tanımlı değil" };
  }

  try {
    await callGeminiJson<{ ok: boolean }>({
      systemPrompt: "Sadece JSON döndür.",
      userPrompt: "Şu JSON'u döndür: {\"ok\":true}",
      temperature: 0,
      timeoutMs: 20000
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Gemini health check tamamlanamadı." };
  }
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => reject(new GeminiRequestError("Gemini yanıt süresi aşıldı.")), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeout) {
      clearTimeout(timeout);
    }
  }
}
