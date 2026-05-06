import { parseJsonSafely } from "./safeJson.ts";

const DEFAULT_BASE_URL = "http://localhost:11434";
const DEFAULT_MODEL = "gemma4:31b-cloud";
const DEFAULT_TIMEOUT_MS = 120000;

export type OllamaJsonRequest = {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  timeoutMs?: number;
};

export class OllamaRequestError extends Error {
  constructor(message = "Ollama baglantisi kurulamadi.") {
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
      const errorText = await response.text();

      if (errorText.toLocaleLowerCase("tr-TR").includes("not found")) {
        throw new OllamaRequestError(`Ollama modeli bulunamadi: ${model}. Once modeli Ollama tarafinda erisilebilir hale getirin.`);
      }

      throw new OllamaRequestError("Ollama modeli yanit vermedi.");
    }

    const payload = await response.json() as { message?: { content?: string }; response?: string };
    const responseText = payload.message?.content ?? payload.response ?? "";

    if (!responseText.trim()) {
      throw new OllamaRequestError("Ollama bos yanit dondurdu.");
    }

    return parseJsonSafely<T>(responseText);
  } catch (error) {
    if (error instanceof OllamaRequestError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new OllamaRequestError("Ollama yanit suresi asildi.");
    }

    throw new OllamaRequestError("Ollama baglantisi kurulamadi.");
  } finally {
    clearTimeout(timeout);
  }
}

export async function checkOllamaHealth(timeoutMs = 60000): Promise<{ ok: true } | { ok: false; error: string }> {
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
        options: { temperature: 0 },
        messages: [
          { role: "system", content: "Only JSON." },
          { role: "user", content: "Return an object with ok true." }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();

      if (errorText.toLocaleLowerCase("tr-TR").includes("not found")) {
        return { ok: false, error: "Ollama modeli bulunamadi" };
      }

      return { ok: false, error: "Ollama modeli yanit vermedi" };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Ollama baglantisi kurulamadi" };
  } finally {
    clearTimeout(timeout);
  }
}
