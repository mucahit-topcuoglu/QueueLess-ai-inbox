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
      return NextResponse.json({ ok: false, error: "En az bir PDF CV yuklenmelidir." }, { status: 400 });
    }

    const jobTextResult = await resolveJobText(jobUrl, manualJobText);

    if (!jobTextResult.text) {
      return NextResponse.json({
        ok: false,
        error: "Is ilani linki okunamadi, manuel ilan metni girin."
      }, { status: 400 });
    }

    const cvTexts: UploadedTextFile[] = [];
    const extractionWarnings: string[] = [];

    for (const file of files) {
      const extractedText = await extractTextForAnalysis(file, extractionWarnings);

      cvTexts.push({
        fileName: file.name,
        text: extractedText
      });
    }

    const result = await analyzeRecruitment(jobTextResult.text, cvTexts);

    return NextResponse.json({
      ok: true,
      ...result,
      warning: [result.warning, jobTextResult.warning, ...extractionWarnings].filter(Boolean).join(" ") || undefined
    });
  } catch (error) {
    if (error instanceof PdfValidationError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: false, error: "Recruitment analizi tamamlanamadi." }, { status: 500 });
  }
}

async function resolveJobText(jobUrl: string, manualJobText: string): Promise<{ text: string; warning?: string }> {
  if (manualJobText.trim()) {
    return { text: truncateForModel(manualJobText, MAX_JOB_TEXT_CHARS) };
  }

  if (!jobUrl.trim()) {
    return { text: "", warning: "Is ilani metni bulunamadi." };
  }

  try {
    const url = new URL(jobUrl);

    if (isUnsupportedLinkedInCollectionUrl(url)) {
      return {
        text: "",
        warning: "LinkedIn oneri/collection linkleri giris gerektirdigi icin okunamadi. Lutfen is ilani metnini manuel alana yapistirin."
      };
    }

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      return { text: "", warning: "Is ilani linki okunamadi, manuel ilan metni girin." };
    }

    const html = await response.text();
    const text = stripHtml(html);

    if (looksLikeBlockedJobPage(text)) {
      return {
        text: "",
        warning: "Is ilani sayfasi giris veya bot korumasi nedeniyle okunamadi. Lutfen manuel ilan metni girin."
      };
    }

    return {
      text: truncateForModel(text, MAX_JOB_TEXT_CHARS),
      warning: text ? undefined : "Is ilani linki okunamadi, manuel ilan metni girin."
    };
  } catch {
    return { text: "", warning: "Is ilani linki okunamadi, manuel ilan metni girin." };
  }
}

async function extractTextForAnalysis(file: File, warnings: string[]): Promise<string> {
  try {
    return await extractPdfText(file);
  } catch (error) {
    if (error instanceof PdfValidationError && error.code === "unreadable") {
      warnings.push(`${file.name}: PDF metni okunamadi, fallback analiz dosya adi ve sinirli bilgiyle uretildi.`);
      return `PDF metni okunamadi. Dosya adi: ${file.name}. Aday bilgileri bulunamadi.`;
    }

    throw error;
  }
}

function isUnsupportedLinkedInCollectionUrl(url: URL): boolean {
  return url.hostname.includes("linkedin.com") && url.pathname.includes("/jobs/collections");
}

function looksLikeBlockedJobPage(text: string): boolean {
  const normalizedText = text.toLocaleLowerCase("tr-TR");

  return normalizedText.includes("sign in")
    || normalizedText.includes("join linkedin")
    || normalizedText.includes("linkedin login")
    || normalizedText.length < 200;
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
