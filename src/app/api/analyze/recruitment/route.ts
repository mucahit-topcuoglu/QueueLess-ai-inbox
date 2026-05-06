import { NextResponse } from "next/server";
import { analyzeRecruitment } from "@/lib/ai/analyzeRecruitment";
import { extractPdfText, PdfValidationError, truncateForModel } from "@/lib/pdf/extractPdfText";
import type { UploadedTextFile } from "@/lib/ai/schemas";

export const runtime = "nodejs";

const MAX_JOB_TEXT_CHARS = 12000;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const jobUrl = getTextField(formData, "jobUrl");
    const manualJobText = getTextField(formData, "jobDescriptionText");
    const files = formData.getAll("files").filter((item): item is File => item instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ ok: false, error: "En az bir PDF CV yüklenmelidir." }, { status: 400 });
    }

    const jobTextResult = await resolveJobText(jobUrl, manualJobText);

    if (!jobTextResult.text) {
      return NextResponse.json({
        ok: false,
        error: "İş ilanı linki okunamadı, manuel ilan metni girin."
      }, { status: 400 });
    }

    const cvTexts: UploadedTextFile[] = [];

    for (const file of files) {
      cvTexts.push({
        fileName: file.name,
        text: await extractPdfText(file)
      });
    }

    const result = await analyzeRecruitment(jobTextResult.text, cvTexts);

    return NextResponse.json({
      ok: true,
      ...result,
      warning: result.warning ?? jobTextResult.warning
    });
  } catch (error) {
    if (error instanceof PdfValidationError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: false, error: "Recruitment analizi tamamlanamadı." }, { status: 500 });
  }
}

async function resolveJobText(jobUrl: string, manualJobText: string): Promise<{ text: string; warning?: string }> {
  if (manualJobText.trim()) {
    return { text: truncateForModel(manualJobText, MAX_JOB_TEXT_CHARS) };
  }

  if (!jobUrl.trim()) {
    return { text: "", warning: "İş ilanı metni bulunamadı." };
  }

  try {
    const url = new URL(jobUrl);
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      return { text: "", warning: "İş ilanı linki okunamadı, manuel ilan metni girin." };
    }

    const html = await response.text();
    const text = stripHtml(html);

    return {
      text: truncateForModel(text, MAX_JOB_TEXT_CHARS),
      warning: text ? undefined : "İş ilanı linki okunamadı, manuel ilan metni girin."
    };
  } catch {
    return { text: "", warning: "İş ilanı linki okunamadı, manuel ilan metni girin." };
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTextField(formData: FormData, name: string): string {
  const value = formData.get(name);

  return typeof value === "string" ? value : "";
}
