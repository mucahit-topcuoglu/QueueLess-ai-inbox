import { callGeminiJson, callGeminiJsonWithInlineFiles, type GeminiInlineFile } from "./geminiClient.ts";
import { buildFallbackDocumentAnalysis } from "./fallbackAnalyzer.ts";
import { buildDocumentAnalysisPrompt, getBaseSystemPrompt } from "./prompts.ts";
import { normalizeDocumentAnalysis, type AnalysisEnvelope, type DocumentAnalysisResult, type UploadedTextFile } from "./schemas.ts";

export async function analyzeDocument(documentType: string | undefined, documentTexts: UploadedTextFile[], pdfFiles: GeminiInlineFile[] = []): Promise<AnalysisEnvelope<DocumentAnalysisResult>> {
  const fallback = () => ({
    mode: "fallback" as const,
    warning: "Gemini API kullanılamadı, fallback analiz sonucu gösteriliyor.",
    data: buildFallbackDocumentAnalysis(documentType, documentTexts)
  });

  if (process.env.AI_ANALYSIS_MODE === "fallback") {
    return fallback();
  }

  try {
    const request = {
      systemPrompt: getBaseSystemPrompt(),
      userPrompt: buildDocumentAnalysisPrompt(documentType, documentTexts)
    };
    const rawResult = pdfFiles.length > 0
      ? await callGeminiJsonWithInlineFiles<unknown>({ ...request, files: pdfFiles })
      : await callGeminiJson<unknown>(request);

    return {
      mode: "gemini",
      data: normalizeDocumentAnalysis(rawResult)
    };
  } catch {
    return fallback();
  }
}
