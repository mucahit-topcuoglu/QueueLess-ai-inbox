import { callOllamaJson } from "./ollamaClient.ts";
import { AI_SYSTEM_PROMPT, buildRecruitmentAnalysisPrompt } from "./prompts.ts";
import { normalizeRecruitmentAnalysis, type AnalysisEnvelope, type RecruitmentAnalysisResult, type UploadedTextFile } from "./schemas.ts";

export async function analyzeRecruitment(jobText: string, cvTexts: UploadedTextFile[]): Promise<AnalysisEnvelope<RecruitmentAnalysisResult>> {
  const rawResult = await callOllamaJson<unknown>({
    systemPrompt: AI_SYSTEM_PROMPT,
    userPrompt: buildRecruitmentAnalysisPrompt(jobText, cvTexts)
  });

  return {
    mode: "ollama",
    data: normalizeRecruitmentAnalysis(rawResult)
  };
}
