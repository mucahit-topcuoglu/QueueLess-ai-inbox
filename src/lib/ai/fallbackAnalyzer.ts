import { analyzeApplication } from "../analyzer.ts";
import type { ApplicationRecord } from "../../types/application.ts";
import type { DocumentAnalysisResult, RecruitmentAnalysisResult, UploadedTextFile } from "./schemas.ts";

export function buildFallbackRecruitmentAnalysis(jobText: string, cvTexts: UploadedTextFile[]): RecruitmentAnalysisResult {
  const jobWords = tokenize(jobText);

  return {
    jobSummary: jobText.trim() ? truncate(jobText, 500) : "İş ilanı metni okunamadı; manuel ilan metni girilmesi önerilir.",
    requiredSkills: [...jobWords].slice(0, 8),
    niceToHaveSkills: [],
    candidates: cvTexts.map((cv) => {
      const cvWords = tokenize(cv.text);
      const overlap = [...jobWords].filter((word) => cvWords.has(word)).length;
      const matchScore = Math.min(Math.max(overlap * 12, cv.text.trim() ? 25 : 0), 85);

      return {
        fileName: cv.fileName,
        candidateName: extractName(cv.text),
        matchScore,
        category: matchScore >= 70 ? "Değerlendirilebilir" : matchScore >= 40 ? "Eksik Bilgi" : "Uygun Değil",
        strengths: [...jobWords].filter((word) => cvWords.has(word)).slice(0, 5),
        missingFields: cv.text.trim() ? [] : ["CV metni okunamadı"],
        risks: cv.text.trim() ? [] : ["PDF metni yetersiz"],
        recommendedAction: matchScore >= 70 ? "İnsan değerlendirmesine alınabilir." : "Manuel kontrol önerilir.",
        aiSummary: "AI servisi kullanılamadığı için demo fallback eşleştirme sonucu üretildi."
      };
    }),
    overallSummary: "AI servisi kullanılamadı; fallback analiz sonucu gösteriliyor."
  };
}

export function buildFallbackDocumentAnalysis(documentType: string | undefined, documentTexts: UploadedTextFile[]): DocumentAnalysisResult {
  return {
    documents: documentTexts.map((document) => {
      const application = buildSyntheticApplication(documentType, document);
      const result = analyzeApplication(application);

      return {
        fileName: document.fileName,
        detectedDocumentType: result.detectedApplicationType,
        confidenceScore: Math.round(result.confidenceScore * 100),
        recommendedQueue: result.recommendedQueue === "İncelemeye Alındı" ? "İncelemeye Alındı" : result.recommendedQueue === "Eksik Evrak" ? "Eksik Evrak" : "Riskli / Manuel Kontrol",
        checklist: result.checklistResult.map((item) => ({
          field: item.label,
          status: item.present ? "Var" : "Eksik",
          note: item.present ? "Alan tespit edildi." : "Alan eksik görünüyor."
        })),
        missingFields: result.missingFields,
        riskFlags: result.riskFlags,
        aiSummary: `${result.aiSummary} AI servisi kullanılamadığı için deterministic fallback sonucu gösteriliyor.`,
        generatedReplyDraft: result.generatedReplyDraft
      };
    }),
    overallSummary: "AI servisi kullanılamadı; demo fallback belge analizi gösteriliyor."
  };
}

function buildSyntheticApplication(documentType: string | undefined, document: UploadedTextFile): ApplicationRecord {
  const selectedType = documentType || "Bilinmeyen Belge";

  return {
    id: `uploaded-${document.fileName}`,
    senderName: "Bilinmeyen Başvuran",
    senderEmail: "uploaded.demo@example.com",
    subject: `${selectedType} PDF analizi`,
    body: `${selectedType}\n${document.text}`,
    attachmentName: document.fileName,
    documentType: "PDF",
    detectedApplicationType: "Bilinmeyen Belge",
    confidenceScore: 0,
    priority: "Normal",
    status: "Gelen Başvurular",
    checklist: [],
    missingFields: [],
    riskFlags: [],
    aiSummary: "",
    generatedReplyDraft: "",
    createdAt: new Date().toISOString()
  };
}

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLocaleLowerCase("tr-TR")
      .split(/[^a-zA-ZçğıöşüÇĞİÖŞÜ0-9+#.]+/u)
      .map((word) => word.trim())
      .filter((word) => word.length >= 3)
  );
}

function extractName(text: string): string {
  const match = text.match(/(?:ad soyad|isim|name)\s*[:\-]\s*([^\n\r]+)/i);

  return match?.[1]?.trim().slice(0, 80) || "Bilinmeyen Aday";
}

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
