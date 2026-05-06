import { NextResponse } from "next/server";
import { analyzeDocument } from "@/lib/ai/analyzeDocument";
import { extractPdfText, PdfValidationError } from "@/lib/pdf/extractPdfText";
import type { UploadedTextFile } from "@/lib/ai/schemas";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const documentType = getTextField(formData, "documentType") || undefined;
    const files = formData.getAll("files").filter((item): item is File => item instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ ok: false, error: "En az bir PDF belge yüklenmelidir." }, { status: 400 });
    }

    const documentTexts: UploadedTextFile[] = [];
    const extractionWarnings: string[] = [];

    for (const file of files) {
      const extracted = await extractPdfTextOrRisk(file);
      documentTexts.push(extracted);

      if (extracted.extractionError) {
        extractionWarnings.push(`${file.name}: ${extracted.extractionError}`);
      }
    }

    const result = await analyzeDocument(documentType, documentTexts);

    return NextResponse.json({
      ok: true,
      mode: result.mode,
      ...result.data,
      warning: [result.warning, ...extractionWarnings].filter(Boolean).join(" ") || undefined
    });
  } catch (error) {
    if (error instanceof PdfValidationError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: false, error: "Belge analizi tamamlanamadı." }, { status: 500 });
  }
}

async function extractPdfTextOrRisk(file: File): Promise<UploadedTextFile> {
  try {
    return {
      fileName: file.name,
      text: await extractPdfText(file)
    };
  } catch (error) {
    if (error instanceof PdfValidationError && error.code === "unreadable") {
      return {
        fileName: file.name,
        text: "",
        extractionError: error.message
      };
    }

    throw error;
  }
}

function getTextField(formData: FormData, name: string): string {
  const value = formData.get(name);

  return typeof value === "string" ? value : "";
}
