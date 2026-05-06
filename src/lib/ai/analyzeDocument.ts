import { callGeminiJson } from "./geminiClient.ts";
import { buildFallbackDocumentAnalysis } from "./fallbackAnalyzer.ts";
import { buildDocumentAnalysisPrompt, getBaseSystemPrompt } from "./prompts.ts";
import { normalizeDocumentAnalysis, type AnalysisEnvelope, type DocumentAnalysisResult, type UploadedTextFile } from "./schemas.ts";

export async function analyzeDocument(documentType: string | undefined, documentTexts: UploadedTextFile[]): Promise<AnalysisEnvelope<DocumentAnalysisResult>> {
  const fallback = () => ({
    mode: "fallback" as const,
    warning: "Gemini API kullanılamadı, fallback analiz sonucu gösteriliyor.",
    data: buildFallbackDocumentAnalysis(documentType, documentTexts)
  });

  if (process.env.AI_ANALYSIS_MODE === "fallback") {
    return fallback();
  }

  try {
    const rawResult = await callGeminiJson<unknown>({
      systemPrompt: getBaseSystemPrompt(),
      userPrompt: buildDocumentAnalysisPrompt(documentType, documentTexts)
    });

    return {
      mode: "gemini",
      data: normalizeDocumentAnalysis(rawResult)
    };
  } catch {
    return fallback();
  }
}
