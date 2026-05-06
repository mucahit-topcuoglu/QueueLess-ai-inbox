import type { AnalysisEnvelope, DocumentAnalysisResult, RecruitmentAnalysisResult } from "@/lib/ai/schemas";

export type ApiAnalysisResponse<TData> = AnalysisEnvelope<TData> & {
  ok: true;
};

export async function analyzeRecruitment(jobUrl: string, files: File[], jobDescriptionText?: string) {
  const formData = new FormData();
  formData.set("jobUrl", jobUrl);

  if (jobDescriptionText) {
    formData.set("jobDescriptionText", jobDescriptionText);
  }

  for (const file of files) {
    formData.append("files", file);
  }

  const response = await fetch("/api/analyze/recruitment", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Recruitment analizi tamamlanamadı.");
  }

  return response.json() as Promise<ApiAnalysisResponse<RecruitmentAnalysisResult>>;
}

export async function analyzeDocument(documentType: string, files: File[]) {
  const formData = new FormData();
  formData.set("documentType", documentType);

  for (const file of files) {
    formData.append("files", file);
  }

  const response = await fetch("/api/analyze/document", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Belge analizi tamamlanamadı.");
  }

  return response.json() as Promise<ApiAnalysisResponse<DocumentAnalysisResult>>;
}
