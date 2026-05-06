export class SafeJsonParseError extends Error {
  constructor(message = "AI yanıtı JSON olarak okunamadı.") {
    super(message);
    this.name = "SafeJsonParseError";
  }
}

export function parseJsonSafely<T>(rawText: string): T {
  const cleanedText = stripMarkdownFence(rawText.trim());
  const parseCandidates = [cleanedText, extractFirstJsonObject(cleanedText)].filter((item): item is string => Boolean(item));

  for (const candidate of parseCandidates) {
    try {
      return JSON.parse(candidate) as T;
    } catch {
      continue;
    }
  }

  throw new SafeJsonParseError();
}

function stripMarkdownFence(text: string): string {
  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);

  return fencedMatch?.[1]?.trim() ?? text;
}

function extractFirstJsonObject(text: string): string | null {
  const firstBrace = text.indexOf("{");

  if (firstBrace === -1) {
    return null;
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = firstBrace; index < text.length; index += 1) {
    const char = text[index];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === "\"") {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (char === "{") {
      depth += 1;
    }

    if (char === "}") {
      depth -= 1;
    }

    if (depth === 0) {
      return text.slice(firstBrace, index + 1);
    }
  }

  return null;
}
