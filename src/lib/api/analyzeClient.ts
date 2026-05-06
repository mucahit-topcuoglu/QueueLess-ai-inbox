import type { AiMode, DocumentAnalysisResult, RecruitmentAnalysisResult } from "@/lib/ai/schemas";

export type ApiAnalysisResponse<TData> = {
  ok: true;
  mode: AiMode;
  warning?: string;
  data: TData;
};

export async function analyzeRecruitment(jobUrl: string, files: File[], jobDescriptionText?: string): Promise<ApiAnalysisResponse<RecruitmentAnalysisResult>> {
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
    throw new Error(await readApiError(response, "Recruitment analizi tamamlanamadı."));
  }

  const payload = await response.json() as ({ ok: true; mode: AiMode; warning?: string } & RecruitmentAnalysisResult);

  return {
    ok: true,
    mode: payload.mode,
    warning: payload.warning,
    data: {
      jobSummary: payload.jobSummary,
      requiredSkills: payload.requiredSkills,
      niceToHaveSkills: payload.niceToHaveSkills,
      candidates: payload.candidates,
      overallSummary: payload.overallSummary
    }
  };
}

export async function analyzeDocument(documentType: string, files: File[]): Promise<ApiAnalysisResponse<DocumentAnalysisResult>> {
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
    throw new Error(await readApiError(response, "Belge analizi tamamlanamadı."));
  }

  const payload = await response.json() as ({ ok: true; mode: AiMode; warning?: string } & DocumentAnalysisResult);

  return {
    ok: true,
    mode: payload.mode,
    warning: payload.warning,
    data: {
      documents: payload.documents,
      overallSummary: payload.overallSummary
    }
  };
}

async function readApiError(response: Response, fallbackMessage: string): Promise<string> {
  try {
    const payload = await response.json() as { error?: string };

    return payload.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}
