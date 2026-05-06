import { callGeminiJson } from "./geminiClient.ts";
import { buildFallbackRecruitmentAnalysis } from "./fallbackAnalyzer.ts";
import { buildRecruitmentAnalysisPrompt, getBaseSystemPrompt } from "./prompts.ts";
import { normalizeRecruitmentAnalysis, type AnalysisEnvelope, type RecruitmentAnalysisResult, type UploadedTextFile } from "./schemas.ts";

export async function analyzeRecruitment(jobText: string, cvTexts: UploadedTextFile[]): Promise<AnalysisEnvelope<RecruitmentAnalysisResult>> {
  const fallback = () => ({
    mode: "fallback" as const,
    warning: "Gemini API kullanılamadı, fallback analiz sonucu gösteriliyor.",
    data: buildFallbackRecruitmentAnalysis(jobText, cvTexts)
  });

  if (process.env.AI_ANALYSIS_MODE === "fallback") {
    return fallback();
  }

  try {
    const rawResult = await callGeminiJson<unknown>({
      systemPrompt: getBaseSystemPrompt(),
      userPrompt: buildRecruitmentAnalysisPrompt(jobText, cvTexts)
    });

    return {
      mode: "gemini",
      data: normalizeRecruitmentAnalysis(rawResult)
    };
  } catch {
    return fallback();
  }
}
