export type AiMode = "gemini" | "fallback";

export type AnalysisEnvelope<TData> = {
  mode: AiMode;
  warning?: string;
  data: TData;
};

export type UploadedTextFile = {
  fileName: string;
  text: string;
};

export type CandidateCategory = "Uygun" | "Değerlendirilebilir" | "Eksik Bilgi" | "Uygun Değil";

export type RecruitmentCandidateResult = {
  fileName: string;
  candidateName: string;
  matchScore: number;
  category: CandidateCategory;
  strengths: string[];
  missingFields: string[];
  risks: string[];
  recommendedAction: string;
  aiSummary: string;
};

export type RecruitmentAnalysisResult = {
  jobSummary: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  candidates: RecruitmentCandidateResult[];
  overallSummary: string;
};

export type DocumentChecklistStatus = "Var" | "Eksik" | "Riskli";
export type DocumentRecommendedQueue = "Eksik Evrak" | "İncelemeye Alındı" | "Riskli / Manuel Kontrol";

export type DocumentChecklistItem = {
  field: string;
  status: DocumentChecklistStatus;
  note: string;
};

export type DocumentAnalysisItem = {
  fileName: string;
  detectedDocumentType: string;
  confidenceScore: number;
  recommendedQueue: DocumentRecommendedQueue;
  checklist: DocumentChecklistItem[];
  missingFields: string[];
  riskFlags: string[];
  aiSummary: string;
  generatedReplyDraft: string;
};

export type DocumentAnalysisResult = {
  documents: DocumentAnalysisItem[];
  overallSummary: string;
};

export function normalizeRecruitmentAnalysis(value: unknown): RecruitmentAnalysisResult {
  const record = asRecord(value);
  const candidates = Array.isArray(record.candidates) ? record.candidates.map((candidate) => {
    const item = asRecord(candidate);

    return {
      fileName: asText(item.fileName, "bilinmeyen.pdf"),
      candidateName: asText(item.candidateName, "Bilinmeyen Aday"),
      matchScore: clampScore(item.matchScore),
      category: normalizeCandidateCategory(item.category),
      strengths: toStringArray(item.strengths),
      missingFields: toStringArray(item.missingFields),
      risks: toStringArray(item.risks),
      recommendedAction: asText(item.recommendedAction, "İnsan kontrolü ile değerlendirilmeli."),
      aiSummary: asText(item.aiSummary, "Yeterli bilgi bulunamadı.")
    };
  }) : [];

  return {
    jobSummary: asText(record.jobSummary, "İş ilanı özeti bulunamadı."),
    requiredSkills: toStringArray(record.requiredSkills),
    niceToHaveSkills: toStringArray(record.niceToHaveSkills),
    candidates,
    overallSummary: asText(record.overallSummary, "Analiz tamamlandı.")
  };
}

export function normalizeDocumentAnalysis(value: unknown): DocumentAnalysisResult {
  const record = asRecord(value);
  const documents = Array.isArray(record.documents) ? record.documents.map((document) => {
    const item = asRecord(document);
    const missingFields = toStringArray(item.missingFields);
    const riskFlags = toStringArray(item.riskFlags);
    const confidenceScore = clampScore(item.confidenceScore);

    return {
      fileName: asText(item.fileName, "bilinmeyen.pdf"),
      detectedDocumentType: asText(item.detectedDocumentType, "Bilinmeyen Belge"),
      confidenceScore,
      recommendedQueue: normalizeQueue(item.recommendedQueue, missingFields, riskFlags, confidenceScore),
      checklist: normalizeChecklist(item.checklist),
      missingFields,
      riskFlags,
      aiSummary: asText(item.aiSummary, "Belge analizi tamamlandı."),
      generatedReplyDraft: asText(item.generatedReplyDraft, "Manuel kontrol gerekli. Gerçek mail gönderimi yapılmaz.")
    };
  }) : [];

  return {
    documents,
    overallSummary: asText(record.overallSummary, "Belge analizi tamamlandı.")
  };
}

function normalizeChecklist(value: unknown): DocumentChecklistItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((checklistItem) => {
    const item = asRecord(checklistItem);

    return {
      field: asText(item.field, "Bilinmeyen Alan"),
      status: normalizeChecklistStatus(item.status),
      note: asText(item.note, "Not bulunamadı.")
    };
  });
}

function normalizeCandidateCategory(value: unknown): CandidateCategory {
  const allowed: CandidateCategory[] = ["Uygun", "Değerlendirilebilir", "Eksik Bilgi", "Uygun Değil"];
  const text = asText(value, "Eksik Bilgi");

  return allowed.includes(text as CandidateCategory) ? text as CandidateCategory : "Eksik Bilgi";
}

function normalizeChecklistStatus(value: unknown): DocumentChecklistStatus {
  const allowed: DocumentChecklistStatus[] = ["Var", "Eksik", "Riskli"];
  const text = asText(value, "Eksik");

  return allowed.includes(text as DocumentChecklistStatus) ? text as DocumentChecklistStatus : "Eksik";
}

function normalizeQueue(value: unknown, missingFields: string[], riskFlags: string[], confidenceScore: number): DocumentRecommendedQueue {
  const allowed: DocumentRecommendedQueue[] = ["Eksik Evrak", "İncelemeye Alındı", "Riskli / Manuel Kontrol"];
  const text = asText(value, "");

  if (riskFlags.length > 0 || confidenceScore < 60) {
    return "Riskli / Manuel Kontrol";
  }

  if (allowed.includes(text as DocumentRecommendedQueue)) {
    return text as DocumentRecommendedQueue;
  }

  return missingFields.length > 0 ? "Eksik Evrak" : "İncelemeye Alındı";
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean) : [];
}

function clampScore(value: unknown): number {
  const numberValue = typeof value === "number" ? value : Number(value);

  if (Number.isNaN(numberValue)) {
    return 0;
  }

  return Math.min(Math.max(Math.round(numberValue), 0), 100);
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function asText(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}
