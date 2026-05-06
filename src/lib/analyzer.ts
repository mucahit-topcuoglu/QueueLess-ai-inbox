import { CHECKLIST_RULES, LOW_CONFIDENCE_THRESHOLD, RISK_FLAGS } from "./constants.ts";
import { createReplyDraft } from "./emailDraft.ts";
import { calculatePriority, hasReplyDraftForApproval, recommendQueue } from "./queueEngine.ts";
import type { AnalyzerResult, ApplicationRecord, ApplicationType, ChecklistItem, DocumentType } from "../types/application.ts";

const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_ALIASES: Record<string, readonly string[]> = {
  "Ad Soyad": ["ad soyad", "isim", "başvuran"],
  "Öğrenci No": ["öğrenci no", "ogrenci no", "student no"],
  "Staj Dönemi": ["staj dönemi", "staj donemi", "dönem"],
  "Tarih": ["tarih"],
  "İmza": ["imza", "ıslak imza", "e-imza"],
  "Kurum Adı": ["kurum adı", "kurum adi", "demo kurum"],
  "İletişim Bilgisi": ["iletişim bilgisi", "iletisim bilgisi", "telefon", "e-posta"],
  "Eğitim Bilgisi": ["eğitim bilgisi", "egitim bilgisi", "üniversite", "lise"],
  "Deneyim": ["deneyim", "tecrübe", "staj deneyimi"],
  "CV Dosyası": ["cv dosyası", "cv dosyasi", "özgeçmiş", "ozgecmis", ".pdf"],
  "Başvuru Konusu": ["başvuru konusu", "basvuru konusu", "konu"]
};

export function analyzeApplication(application: ApplicationRecord): AnalyzerResult {
  const detectedApplicationType = detectApplicationType(application);
  const documentType = detectDocumentType(application.attachmentName);
  const checklistResult = buildChecklistResult(application, detectedApplicationType);
  const missingFields = checklistResult
    .filter((item) => item.required && !item.present)
    .map((item) => item.label);
  const confidenceScore = calculateConfidenceScore(application, detectedApplicationType, checklistResult);
  const riskFlags = detectRiskFlags(application, detectedApplicationType, documentType, confidenceScore, checklistResult);
  const recommendedQueue = recommendQueue({ confidenceScore, missingFields, riskFlags });
  const priority = calculatePriority(recommendedQueue, missingFields, riskFlags);
  const generatedReplyDraft = createReplyDraft({ ...application, missingFields, riskFlags, recommendedQueue });
  const aiSummary = createAiSummary(detectedApplicationType, confidenceScore, missingFields, riskFlags, recommendedQueue);

  return {
    detectedApplicationType,
    documentType,
    confidenceScore,
    priority,
    checklistResult,
    missingFields,
    riskFlags,
    recommendedQueue,
    requiresHumanApproval: true,
    replyDraftReadyForApproval: hasReplyDraftForApproval(recommendedQueue),
    aiSummary,
    generatedReplyDraft
  };
}

export function enrichApplicationWithAnalysis(application: ApplicationRecord): ApplicationRecord {
  const analysis = analyzeApplication(application);

  return {
    ...application,
    documentType: analysis.documentType,
    detectedApplicationType: analysis.detectedApplicationType,
    confidenceScore: analysis.confidenceScore,
    priority: analysis.priority,
    status: analysis.recommendedQueue,
    checklist: analysis.checklistResult,
    missingFields: analysis.missingFields,
    riskFlags: analysis.riskFlags,
    aiSummary: analysis.aiSummary,
    generatedReplyDraft: analysis.generatedReplyDraft
  };
}

function detectApplicationType(application: ApplicationRecord): ApplicationType {
  const text = normalize(`${application.subject} ${application.body} ${application.attachmentName ?? ""}`);

  if (text.includes("staj")) {
    return "Staj Evrakı";
  }

  if (text.includes("cv") || text.includes("özgeçmiş") || text.includes("ozgecmis")) {
    return "CV Başvurusu";
  }

  if (text.includes("genel başvuru") || text.includes("genel basvuru") || text.includes("başvuru formu")) {
    return "Genel Başvuru Formu";
  }

  return "Bilinmeyen Belge";
}

function detectDocumentType(attachmentName: string | null): DocumentType {
  if (!attachmentName) {
    return "Plain Email";
  }

  const normalizedAttachment = attachmentName.toLowerCase();

  if (normalizedAttachment.endsWith(".pdf")) {
    return "PDF";
  }

  if (normalizedAttachment.endsWith(".docx")) {
    return "DOCX";
  }

  if (normalizedAttachment.endsWith(".png") || normalizedAttachment.endsWith(".jpg") || normalizedAttachment.endsWith(".jpeg")) {
    return "Image";
  }

  return "Unknown";
}

function buildChecklistResult(application: ApplicationRecord, type: ApplicationType): ChecklistItem[] {
  const rules = CHECKLIST_RULES[type];
  const providedChecklist = new Map(application.checklist.map((item) => [normalize(item.label), item.present]));
  const text = normalize(`${application.body} ${application.attachmentName ?? ""}`);

  return rules.map((rule) => {
    const providedValue = providedChecklist.get(normalize(rule.label));

    return {
      ...rule,
      present: providedValue ?? isFieldPresent(rule.label, text)
    };
  });
}

function calculateConfidenceScore(application: ApplicationRecord, type: ApplicationType, checklist: ChecklistItem[]): number {
  if (application.confidenceScore > 0) {
    return clampConfidence(application.confidenceScore);
  }

  if (type === "Bilinmeyen Belge") {
    return 0.35;
  }

  const completedRequiredFields = checklist.filter((item) => item.required && item.present).length;
  const requiredFields = Math.max(checklist.filter((item) => item.required).length, 1);
  const coverageScore = completedRequiredFields / requiredFields;
  const attachmentBoost = application.attachmentName ? 0.12 : -0.2;

  return clampConfidence(0.5 + coverageScore * 0.35 + attachmentBoost);
}

function detectRiskFlags(
  application: ApplicationRecord,
  type: ApplicationType,
  documentType: DocumentType,
  confidenceScore: number,
  checklist: ChecklistItem[]
): string[] {
  const flags = new Set<string>();
  const text = normalize(`${application.subject} ${application.body}`);

  if (!EMAIL_FORMAT_REGEX.test(application.senderEmail)) {
    flags.add(RISK_FLAGS.invalidSenderEmail);
  }

  if (!application.attachmentName) {
    flags.add(RISK_FLAGS.missingAttachment);
  }

  if (confidenceScore < LOW_CONFIDENCE_THRESHOLD) {
    flags.add(RISK_FLAGS.lowConfidence);
  }

  if (type === "Bilinmeyen Belge" || documentType === "Unknown") {
    flags.add(RISK_FLAGS.unknownDocumentType);
  }

  if (text.includes("imza doğrulanamıyor") || text.includes("imza dogrulanamiyor") || text.includes("imza okunamıyor")) {
    flags.add(RISK_FLAGS.unverifiableSignature);
  }

  if (checklist.length === 0) {
    flags.add(RISK_FLAGS.emptyChecklist);
  }

  if (text.includes("tekrar gönderim") || text.includes("duplicate") || text.includes("aynı başvuru")) {
    flags.add(RISK_FLAGS.possibleDuplicate);
  }

  return [...flags];
}

function createAiSummary(
  type: ApplicationType,
  confidenceScore: number,
  missingFields: string[],
  riskFlags: string[],
  queue: string
): string {
  const confidencePercent = Math.round(confidenceScore * 100);

  if (riskFlags.length > 0) {
    return `${type} olarak değerlendirildi. Güven skoru %${confidencePercent}. Riskler nedeniyle önerilen kuyruk: ${queue}.`;
  }

  if (missingFields.length > 0) {
    return `${type} olarak değerlendirildi. ${missingFields.length} eksik alan bulundu. Önerilen kuyruk: ${queue}.`;
  }

  return `${type} olarak değerlendirildi. Zorunlu alanlar tamamlandı. Önerilen kuyruk: ${queue}.`;
}

function isFieldPresent(label: string, normalizedText: string): boolean {
  const aliases = FIELD_ALIASES[label] ?? [label];

  return aliases.some((alias) => normalizedText.includes(normalize(alias)));
}

function normalize(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replaceAll("ı", "i");
}

function clampConfidence(value: number): number {
  return Math.min(Math.max(Number(value.toFixed(2)), 0), 1);
}
