export const MAX_PDF_SIZE_BYTES = 8 * 1024 * 1024;
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

      return truncateForModel(result.text.trim());
    } finally {
      await parser.destroy();
    }
  } catch {
    throw new PdfValidationError("PDF metni okunamadi.", "unreadable");
  }
}

export function validatePdfFile(file: File): void {
  if (file.type !== "application/pdf") {
    throw new PdfValidationError("Sadece PDF dosyalari kabul edilir.", "invalid_type");
  }

  if (file.size > MAX_PDF_SIZE_BYTES) {
    throw new PdfValidationError("PDF dosya boyutu limiti asildi.", "too_large");
  }
}

export function truncateForModel(text: string, maxLength = MAX_MODEL_TEXT_CHARS): string {
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}
