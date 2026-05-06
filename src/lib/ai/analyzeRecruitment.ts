import { AI_SYSTEM_PROMPT, buildRecruitmentAnalysisPrompt } from "./prompts.ts";
import { callOllamaJson } from "./ollamaClient.ts";
import { buildFallbackRecruitmentAnalysis } from "./fallbackAnalyzer.ts";
import { normalizeRecruitmentAnalysis, type AnalysisEnvelope, type RecruitmentAnalysisResult, type UploadedTextFile } from "./schemas.ts";

export async function analyzeRecruitment(jobText: string, cvTexts: UploadedTextFile[]): Promise<AnalysisEnvelope<RecruitmentAnalysisResult>> {
  const fallback = () => ({
    mode: "fallback" as const,
    warning: "AI servisi kullanılamadı, demo fallback sonucu gösteriliyor.",
    data: buildFallbackRecruitmentAnalysis(jobText, cvTexts)
  });

  if (process.env.AI_ANALYSIS_MODE === "fallback") {
    return fallback();
  }

  try {
    const rawResult = await callOllamaJson<unknown>({
      systemPrompt: AI_SYSTEM_PROMPT,
      userPrompt: buildRecruitmentAnalysisPrompt(jobText, cvTexts)
    });

    return {
      mode: "ollama",
      data: normalizeRecruitmentAnalysis(rawResult)
    };
  } catch {
    return fallback();
  }
}
