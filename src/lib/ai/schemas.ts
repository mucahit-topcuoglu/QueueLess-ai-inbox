export type AiMode = "ollama" | "fallback";

export type AnalysisEnvelope<TData> = {
  mode: AiMode;
  warning?: string;
  data: TData;
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

export type UploadedTextFile = {
  fileName: string;
  text: string;
};

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
}

function clampScore(value: unknown): number {
  const numericValue = typeof value === "number" ? value : Number(value);

  if (Number.isNaN(numericValue)) {
    return 0;
  }

  return Math.min(Math.max(Math.round(numericValue), 0), 100);
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function asText(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeCandidateCategory(value: unknown): CandidateCategory {
  const text = asText(value, "Eksik Bilgi");
  const allowed: CandidateCategory[] = ["Uygun", "Değerlendirilebilir", "Eksik Bilgi", "Uygun Değil"];

  return allowed.includes(text as CandidateCategory) ? text as CandidateCategory : "Eksik Bilgi";
}

function normalizeChecklistStatus(value: unknown): DocumentChecklistStatus {
  const text = asText(value, "Eksik");
  const allowed: DocumentChecklistStatus[] = ["Var", "Eksik", "Riskli"];

  return allowed.includes(text as DocumentChecklistStatus) ? text as DocumentChecklistStatus : "Eksik";
}

function normalizeQueue(value: unknown, missingFields: string[], riskFlags: string[], confidenceScore: number): DocumentRecommendedQueue {
  const text = asText(value, "");
  const allowed: DocumentRecommendedQueue[] = ["Eksik Evrak", "İncelemeye Alındı", "Riskli / Manuel Kontrol"];

  if (riskFlags.length > 0 || confidenceScore < 60) {
    return "Riskli / Manuel Kontrol";
  }

  if (allowed.includes(text as DocumentRecommendedQueue)) {
    return text as DocumentRecommendedQueue;
  }

  return missingFields.length > 0 ? "Eksik Evrak" : "İncelemeye Alındı";
}

export function normalizeRecruitmentAnalysis(value: unknown): RecruitmentAnalysisResult {
  const record = asRecord(value);
  const candidates = Array.isArray(record.candidates) ? record.candidates.map((candidate) => {
    const candidateRecord = asRecord(candidate);

    return {
      fileName: asText(candidateRecord.fileName, "bilinmeyen.pdf"),
      candidateName: asText(candidateRecord.candidateName, "Bilinmeyen Aday"),
      matchScore: clampScore(candidateRecord.matchScore),
      category: normalizeCandidateCategory(candidateRecord.category),
      strengths: toStringArray(candidateRecord.strengths),
      missingFields: toStringArray(candidateRecord.missingFields),
      risks: toStringArray(candidateRecord.risks),
      recommendedAction: asText(candidateRecord.recommendedAction, "İnsan kontrolü ile değerlendirilmeli."),
      aiSummary: asText(candidateRecord.aiSummary, "Yeterli bilgi bulunamadı.")
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
    const documentRecord = asRecord(document);
    const checklist = Array.isArray(documentRecord.checklist) ? documentRecord.checklist.map((item) => {
      const itemRecord = asRecord(item);

      return {
        field: asText(itemRecord.field, "Bilinmeyen Alan"),
        status: normalizeChecklistStatus(itemRecord.status),
        note: asText(itemRecord.note, "Not bulunamadı.")
      };
    }) : [];
    const missingFields = toStringArray(documentRecord.missingFields);
    const riskFlags = toStringArray(documentRecord.riskFlags);
    const confidenceScore = clampScore(documentRecord.confidenceScore);

    return {
      fileName: asText(documentRecord.fileName, "bilinmeyen.pdf"),
      detectedDocumentType: asText(documentRecord.detectedDocumentType, "Bilinmeyen Belge"),
      confidenceScore,
      recommendedQueue: normalizeQueue(documentRecord.recommendedQueue, missingFields, riskFlags, confidenceScore),
      checklist,
      missingFields,
      riskFlags,
      aiSummary: asText(documentRecord.aiSummary, "Belge analizi tamamlandı."),
      generatedReplyDraft: asText(documentRecord.generatedReplyDraft, "Manuel kontrol gerekli. Gerçek mail gönderimi yapılmaz.")
    };
  }) : [];

  return {
    documents,
    overallSummary: asText(record.overallSummary, "Belge analizi tamamlandı.")
  };
}
