import { parseJsonSafely } from "./safeJson.ts";

const DEFAULT_BASE_URL = "http://localhost:11434";
const DEFAULT_MODEL = "gemma4:31b-cloud";
const DEFAULT_TIMEOUT_MS = 45000;

export type OllamaJsonRequest = {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  timeoutMs?: number;
};

export class OllamaRequestError extends Error {
  constructor(message = "Ollama bağlantısı kurulamadı.") {
    super(message);
    this.name = "OllamaRequestError";
  }
}

export function getOllamaConfig() {
  return {
    baseUrl: process.env.OLLAMA_BASE_URL?.trim() || DEFAULT_BASE_URL,
    model: process.env.OLLAMA_MODEL?.trim() || DEFAULT_MODEL
  };
}

export async function callOllamaJson<T>({
  systemPrompt,
  userPrompt,
  temperature = 0.1,
  timeoutMs = DEFAULT_TIMEOUT_MS
}: OllamaJsonRequest): Promise<T> {
  const { baseUrl, model } = getOllamaConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        stream: false,
        format: "json",
        options: { temperature },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      throw new OllamaRequestError("Ollama modeli yanıt vermedi.");
    }

    const payload = await response.json() as { message?: { content?: string }; response?: string };
    const responseText = payload.message?.content ?? payload.response ?? "";

    if (!responseText.trim()) {
      throw new OllamaRequestError("Ollama boş yanıt döndürdü.");
    }

    return parseJsonSafely<T>(responseText);
  } catch (error) {
    if (error instanceof OllamaRequestError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new OllamaRequestError("Ollama yanıt süresi aşıldı.");
    }

    throw new OllamaRequestError("Ollama bağlantısı kurulamadı.");
  } finally {
    clearTimeout(timeout);
  }
}

export async function checkOllamaHealth(timeoutMs = 5000): Promise<{ ok: true } | { ok: false; error: string }> {
  const { baseUrl, model } = getOllamaConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/tags`, {
      method: "GET",
      signal: controller.signal
    });

    if (!response.ok) {
      return { ok: false, error: "Ollama bağlantısı kurulamadı" };
    }

    const payload = await response.json() as { models?: { name?: string }[] };
    const modelNames = payload.models?.map((item) => item.name).filter(Boolean) ?? [];
    const modelExists = modelNames.some((name) => name === model || name?.startsWith(`${model}:`));

    if (!modelExists) {
      return { ok: false, error: "Ollama modeli bulunamadı" };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Ollama bağlantısı kurulamadı" };
  } finally {
    clearTimeout(timeout);
  }
}
