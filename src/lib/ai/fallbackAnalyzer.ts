import { analyzeApplication } from "../analyzer.ts";
import { PRODUCT_QUEUES } from "../constants.ts";
import type { ApplicationRecord } from "../../types/application.ts";
import type { DocumentAnalysisResult, RecruitmentAnalysisResult, UploadedTextFile } from "./schemas.ts";

export function buildFallbackRecruitmentAnalysis(jobText: string, cvTexts: UploadedTextFile[]): RecruitmentAnalysisResult {
  const jobWords = tokenize(jobText);

  return {
    jobSummary: jobText.trim() ? truncate(jobText, 500) : "Is ilani metni bulunamadi.",
    requiredSkills: [...jobWords].slice(0, 8),
    niceToHaveSkills: [],
    candidates: cvTexts.map((cv) => {
      const cvWords = tokenize(cv.text);
      const unreadable = Boolean(cv.extractionError) || !cv.text.trim();
      const overlap = [...jobWords].filter((word) => cvWords.has(word)).length;
      const matchScore = unreadable ? 0 : Math.min(Math.max(overlap * 12, cv.text.trim() ? 25 : 0), 85);

      return {
        fileName: cv.fileName,
        candidateName: extractName(cv.text),
        matchScore,
        category: unreadable ? "Eksik Bilgi" : matchScore >= 70 ? "Değerlendirilebilir" : matchScore >= 40 ? "Eksik Bilgi" : "Uygun Değil",
        strengths: [...jobWords].filter((word) => cvWords.has(word)).slice(0, 5),
        missingFields: unreadable ? ["CV metni okunamadi"] : [],
        risks: unreadable ? [cv.extractionError || "CV metni yetersiz"] : [],
        recommendedAction: unreadable ? "PDF metni okunamadigi icin manuel kontrol onerilir." : matchScore >= 70 ? "Insan degerlendirmesine alinabilir." : "Manuel kontrol onerilir.",
        aiSummary: unreadable ? "PDF metni okunamadi; aday uygunlugu guvenilir sekilde hesaplanamadi." : "Gemini API kullanilamadigi icin deterministic fallback analiz sonucu uretildi.",
        generatedReplyDraft: createCandidateReplyDraft(cv.fileName, unreadable, matchScore)
      };
    }),
    overallSummary: "Gemini API kullanilamadi; fallback analiz sonucu gosteriliyor."
  };
}

export function buildFallbackDocumentAnalysis(documentType: string | undefined, documentTexts: UploadedTextFile[]): DocumentAnalysisResult {
  return {
    documents: documentTexts.map((document) => {
      if (document.extractionError || !document.text.trim()) {
        return buildUnreadableDocumentResult(document, documentType);
      }

      const result = analyzeApplication(buildSyntheticApplication(documentType, document));

      return {
        fileName: document.fileName,
        detectedDocumentType: result.detectedApplicationType,
        confidenceScore: Math.round(result.confidenceScore * 100),
        recommendedQueue: result.riskFlags.length > 0 ? "Riskli / Manuel Kontrol" : result.missingFields.length > 0 ? "Eksik Evrak" : "İncelemeye Alındı",
        checklist: result.checklistResult.map((item) => ({
          field: item.label,
          status: item.present ? "Var" : "Eksik",
          note: item.present ? "Alan tespit edildi." : "Alan eksik gorunuyor."
        })),
        missingFields: result.missingFields,
        riskFlags: result.riskFlags,
        aiSummary: `${result.aiSummary} Gemini API kullanilamadigi icin deterministic fallback sonucu gosteriliyor.`,
        generatedReplyDraft: result.generatedReplyDraft
      };
    }),
    overallSummary: "Gemini API kullanilamadi; fallback belge analizi gosteriliyor."
  };
}

function buildUnreadableDocumentResult(document: UploadedTextFile, documentType: string | undefined): DocumentAnalysisResult["documents"][number] {
  const selectedType = documentType || "Bilinmeyen Belge";
  const risk = document.extractionError || "PDF metni okunamadi veya belge taranmis olabilir.";

  return {
    fileName: document.fileName,
    detectedDocumentType: selectedType,
    confidenceScore: 15,
    recommendedQueue: "Riskli / Manuel Kontrol",
    checklist: [
      { field: "PDF metni", status: "Riskli", note: risk },
      { field: "Manuel belge kontrolu", status: "Eksik", note: "Belge icerigi okunamadigi icin insan kontrolu gerekir." }
    ],
    missingFields: ["Okunabilir PDF metni"],
    riskFlags: [risk],
    aiSummary: "PDF metni okunamadi. Basvuru otomatik degerlendirme yerine manuel kontrole yonlendirildi.",
    generatedReplyDraft: [
      "Merhaba,",
      "",
      "Yuklediginiz belge on kontrolde okunabilir metin icermedigi icin otomatik analiz tamamlanamadi.",
      "Lutfen belgeyi okunabilir metin iceren PDF olarak yeniden iletiniz veya gorevli kontrolu icin manuel incelemeye alinmasini bekleyiniz.",
      "",
      "Bu taslak otomatik gonderilmez; insan onayi gerektirir."
    ].join("\n")
  };
}

function buildSyntheticApplication(documentType: string | undefined, document: UploadedTextFile): ApplicationRecord {
  const selectedType = documentType || "Bilinmeyen Belge";

  return {
    id: `uploaded-${document.fileName}`,
    senderName: "Bilinmeyen Basvuran",
    senderEmail: "uploaded.demo@example.com",
    subject: `${selectedType} PDF analizi`,
    body: `${selectedType}\n${document.text}`,
    attachmentName: document.fileName,
    documentType: "PDF",
    detectedApplicationType: "Bilinmeyen Belge",
    confidenceScore: 0,
    priority: "Normal",
    status: PRODUCT_QUEUES[0],
    checklist: [],
    missingFields: [],
    riskFlags: [],
    aiSummary: "",
    generatedReplyDraft: "",
    createdAt: new Date().toISOString()
  };
}

function createCandidateReplyDraft(fileName: string, unreadable: boolean, matchScore: number): string {
  if (unreadable) {
    return [
      "Merhaba,",
      "",
      `${fileName} dosyasinin PDF metni okunamadigi icin aday degerlendirmesi tamamlanamadi.`,
      "Lutfen okunabilir bir CV PDF'i ile tekrar basvuru yapiniz veya insan kaynaklari ekibinin manuel kontrolunu bekleyiniz.",
      "",
      "Bu taslak otomatik gonderilmez; insan onayi gerektirir."
    ].join("\n");
  }

  return [
    "Merhaba,",
    "",
    `CV on degerlendirme skorunuz ${matchScore}/100 olarak hesaplandi.`,
    "Basvurunuz insan kaynaklari ekibi tarafindan kontrol edildikten sonra sonuclandirilacaktir.",
    "",
    "Bu taslak otomatik gonderilmez; insan onayi gerektirir."
  ].join("\n");
}

function tokenize(text: string): Set<string> {
  return new Set(text.toLocaleLowerCase("tr-TR").split(/[^a-zA-ZçğıöşüÇĞİÖŞÜ0-9+#.]+/u).map((word) => word.trim()).filter((word) => word.length >= 3));
}

function extractName(text: string): string {
  const match = text.match(/(?:ad soyad|isim|name)\s*[:\-]\s*([^\n\r]+)/i);

  return match?.[1]?.trim().slice(0, 80) || "Bilinmeyen Aday";
}

function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
