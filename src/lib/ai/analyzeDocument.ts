import { callOllamaJson } from "./ollamaClient.ts";
import { AI_SYSTEM_PROMPT, buildDocumentAnalysisPrompt } from "./prompts.ts";
import { normalizeDocumentAnalysis, type AnalysisEnvelope, type DocumentAnalysisResult, type UploadedTextFile } from "./schemas.ts";

export async function analyzeDocument(documentType: string | undefined, documentTexts: UploadedTextFile[]): Promise<AnalysisEnvelope<DocumentAnalysisResult>> {
  const rawResult = await callOllamaJson<unknown>({
    systemPrompt: AI_SYSTEM_PROMPT,
    userPrompt: buildDocumentAnalysisPrompt(documentType, documentTexts)
  });

  return {
    mode: "ollama",
    data: normalizeDocumentAnalysis(rawResult)
  };
}
