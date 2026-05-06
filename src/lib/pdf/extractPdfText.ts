import { PDFParse } from "pdf-parse";

export const MAX_PDF_SIZE_BYTES = 8 * 1024 * 1024;
export const MAX_MODEL_TEXT_CHARS = 12000;

export class PdfValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PdfValidationError";
  }
}

export async function extractPdfText(file: File): Promise<string> {
  validatePdfFile(file);

  try {
    const arrayBuffer = await file.arrayBuffer();
    const parser = new PDFParse({ data: new Uint8Array(arrayBuffer) });

    try {
      const result = await parser.getText();

      return truncateForModel(result.text.trim());
    } finally {
      await parser.destroy();
    }
  } catch {
    throw new PdfValidationError("PDF metni okunamadı.");
  }
}

export function validatePdfFile(file: File): void {
  if (file.type !== "application/pdf") {
    throw new PdfValidationError("Sadece PDF dosyaları kabul edilir.");
  }

  if (file.size > MAX_PDF_SIZE_BYTES) {
    throw new PdfValidationError("PDF dosya boyutu limiti aşıldı.");
  }
}

export function truncateForModel(text: string, maxLength = MAX_MODEL_TEXT_CHARS): string {
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}
