import { AI_SYSTEM_PROMPT, buildDocumentAnalysisPrompt } from "./prompts.ts";
import { callOllamaJson } from "./ollamaClient.ts";
import { buildFallbackDocumentAnalysis } from "./fallbackAnalyzer.ts";
import { normalizeDocumentAnalysis, type AnalysisEnvelope, type DocumentAnalysisResult, type UploadedTextFile } from "./schemas.ts";

export async function analyzeDocument(documentType: string | undefined, documentTexts: UploadedTextFile[]): Promise<AnalysisEnvelope<DocumentAnalysisResult>> {
  const fallback = () => ({
    mode: "fallback" as const,
    warning: "AI servisi kullanılamadı, demo fallback sonucu gösteriliyor.",
    data: buildFallbackDocumentAnalysis(documentType, documentTexts)
  });

  if (process.env.AI_ANALYSIS_MODE === "fallback") {
    return fallback();
  }

  try {
    const rawResult = await callOllamaJson<unknown>({
      systemPrompt: AI_SYSTEM_PROMPT,
      userPrompt: buildDocumentAnalysisPrompt(documentType, documentTexts)
    });

    return {
      mode: "ollama",
      data: normalizeDocumentAnalysis(rawResult)
    };
  } catch {
    return fallback();
  }
}
