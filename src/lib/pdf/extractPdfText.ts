export const MAX_PDF_SIZE_BYTES = 10 * 1024 * 1024;
export const MAX_MODEL_TEXT_CHARS = 12000;

export type PdfValidationCode = "invalid_type" | "too_large" | "unreadable";

export class PdfValidationError extends Error {
  readonly code: PdfValidationCode;

  constructor(message: string, code: PdfValidationCode) {
    super(message);
    this.name = "PdfValidationError";
    this.code = code;
  }
}

export async function extractPdfText(file: File): Promise<string> {
  validatePdfFile(file);

  try {
    const { PDFParse } = await import("pdf-parse");
    const arrayBuffer = await file.arrayBuffer();
    const parser = new PDFParse({ data: new Uint8Array(arrayBuffer) });

    try {
      const result = await parser.getText();
      const text = result.text.trim();

      if (!text) {
        throw new PdfValidationError("PDF metni okunamadı.", "unreadable");
      }

      return truncateForModel(text);
    } finally {
      await parser.destroy();
    }
  } catch (error) {
    const fallbackText = await extractRawPdfText(file);

    if (fallbackText) {
      return truncateForModel(fallbackText);
    }

    if (error instanceof PdfValidationError) {
      throw error;
    }

    throw new PdfValidationError("PDF metni okunamadı.", "unreadable");
  }
}

export function validatePdfFile(file: File): void {
  const hasPdfExtension = file.name.toLocaleLowerCase("tr-TR").endsWith(".pdf");

  if (file.type && file.type !== "application/pdf" && !hasPdfExtension) {
    throw new PdfValidationError("Sadece PDF dosyaları kabul edilir.", "invalid_type");
  }

  if (file.size > MAX_PDF_SIZE_BYTES) {
    throw new PdfValidationError("PDF dosya boyutu limiti aşıldı.", "too_large");
  }
}

export function truncateForModel(text: string, maxLength = MAX_MODEL_TEXT_CHARS): string {
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}

async function extractRawPdfText(file: File): Promise<string> {
  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const source = bytes.toString("latin1");
    const matches = [...source.matchAll(/\(([^()\r\n]{2,})\)\s*Tj/g), ...source.matchAll(/\(([^()\r\n]{2,})\)\s*'/g)];
    const text = matches
      .map((match) => decodePdfLiteral(match[1] ?? ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    return text.length >= 10 ? text : "";
  } catch {
    return "";
  }
}

function decodePdfLiteral(value: string): string {
  return value
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\([()\\])/g, "$1")
    .trim();
}
