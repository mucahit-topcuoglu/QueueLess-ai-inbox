import { NextResponse } from "next/server";
import { analyzeDocument } from "@/lib/ai/analyzeDocument";
import { OllamaRequestError } from "@/lib/ai/ollamaClient";
import { extractPdfText, PdfValidationError } from "@/lib/pdf/extractPdfText";
import type { UploadedTextFile } from "@/lib/ai/schemas";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const documentType = getTextField(formData, "documentType") || undefined;
    const files = formData.getAll("files").filter((item): item is File => item instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ ok: false, error: "En az bir PDF belge yuklenmelidir." }, { status: 400 });
    }

    const documentTexts: UploadedTextFile[] = [];

    for (const file of files) {
      documentTexts.push({
        fileName: file.name,
        text: await extractPdfText(file)
      });
    }

    const result = await analyzeDocument(documentType, documentTexts);

    return NextResponse.json({
      ok: true,
      ...result
    });
  } catch (error) {
    if (error instanceof PdfValidationError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    if (error instanceof OllamaRequestError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 503 });
    }

    return NextResponse.json({ ok: false, error: "Belge analizi tamamlanamadi." }, { status: 500 });
  }
}

function getTextField(formData: FormData, name: string): string {
  const value = formData.get(name);

  return typeof value === "string" ? value : "";
}
