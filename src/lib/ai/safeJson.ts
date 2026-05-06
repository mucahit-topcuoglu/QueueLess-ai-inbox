export function parseJsonSafely<T>(value: string): T {
  const cleaned = stripMarkdownFence(value).trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    const extracted = extractFirstJsonObject(cleaned);

    if (!extracted) {
      throw new Error("AI response could not be parsed as JSON.");
    }

    return JSON.parse(extracted) as T;
  }
}

function stripMarkdownFence(value: string): string {
  return value
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "");
}

function extractFirstJsonObject(value: string): string | null {
  const start = value.indexOf("{");

  if (start === -1) {
    return null;
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < value.length; index += 1) {
    const char = value[index];

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

      if (depth === 0) {
        return value.slice(start, index + 1);
      }
    }
  }

  return null;
}
