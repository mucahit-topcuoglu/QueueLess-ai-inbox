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

export type GeminiInlineFile = {
  fileName: string;
  mimeType: string;
  data: string;
};

export class GeminiRequestError extends Error {
  constructor(message = "Gemini API cagrisi tamamlanamadi. Analiz fallback moduyla devam eder.") {
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
    throw new GeminiRequestError("GEMINI_API_KEY tanimli degil. Analiz fallback moduyla devam eder.");
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
      throw new GeminiRequestError("Gemini bos yanit dondurdu. Analiz fallback moduyla devam eder.");
    }

    return parseJsonSafely<T>(responseText);
  } catch (error) {
    if (error instanceof GeminiRequestError) {
      throw error;
    }

    throw new GeminiRequestError(createGeminiErrorMessage(error));
  }
}

export async function callGeminiJsonWithInlineFiles<T>({
  systemPrompt,
  userPrompt,
  files,
  temperature = 0.1,
  timeoutMs = DEFAULT_TIMEOUT_MS
}: GeminiJsonRequest & { files: GeminiInlineFile[] }): Promise<T> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;

  if (!apiKey) {
    throw new GeminiRequestError("GEMINI_API_KEY tanimli degil. Analiz fallback moduyla devam eder.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const parts = [
    { text: userPrompt },
    ...files.flatMap((file) => [
      { text: `Attached PDF file: ${file.fileName}` },
      {
        inlineData: {
          mimeType: file.mimeType,
          data: file.data
        }
      }
    ])
  ];

  try {
    const response = await withTimeout(ai.models.generateContent({
      model,
      contents: [{ role: "user", parts }] as never,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature
      }
    }), timeoutMs);
    const responseText = response.text ?? "";

    if (!responseText.trim()) {
      throw new GeminiRequestError("Gemini bos yanit dondurdu. Analiz fallback moduyla devam eder.");
    }

    return parseJsonSafely<T>(responseText);
  } catch (error) {
    if (error instanceof GeminiRequestError) {
      throw error;
    }

    throw new GeminiRequestError(createGeminiErrorMessage(error));
  }
}

export async function checkGeminiHealth(): Promise<{ ok: true } | { ok: false; error: string }> {
  const { hasApiKey } = getGeminiConfig();

  if (!hasApiKey) {
    return { ok: false, error: "GEMINI_API_KEY tanimli degil" };
  }

  try {
    await callGeminiJson<{ ok: boolean }>({
      systemPrompt: "Sadece JSON dondur.",
      userPrompt: "Su JSON'u dondur: {\"ok\":true}",
      temperature: 0,
      timeoutMs: 20000
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Gemini health check tamamlanamadi." };
  }
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => reject(new GeminiRequestError("Gemini yanit suresi asildi. Analiz fallback moduyla devam eder.")), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeout) {
      clearTimeout(timeout);
    }
  }
}

function createGeminiErrorMessage(error: unknown): string {
  const status = typeof error === "object" && error && "status" in error ? Number((error as { status?: unknown }).status) : undefined;

  if (status === 429) {
    return "Gemini kota limiti doldu. Analiz fallback moduyla devam eder.";
  }

  if (status === 503) {
    return "Gemini modeli gecici olarak yogun veya kullanilamiyor. Analiz fallback moduyla devam eder.";
  }

  if (status === 401 || status === 403) {
    return "Gemini API key yetkisi reddedildi. .env.local icindeki GEMINI_API_KEY degerini kontrol edin.";
  }

  return "Gemini API cagrisi tamamlanamadi. Analiz fallback moduyla devam eder.";
}
