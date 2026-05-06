import type { ApplicationType, ChecklistItem } from "../types/application.ts";

export const PRODUCT_QUEUES = [
  "Gelen Başvurular",
  "Eksik Evrak",
  "İncelemeye Alındı",
  "Onay Bekleyen Yanıtlar",
  "Riskli / Manuel Kontrol",
  "Tamamlananlar"
] as const;

export const LOW_CONFIDENCE_THRESHOLD = 0.6;

export const CHECKLIST_RULES: Record<ApplicationType, readonly ChecklistItem[]> = {
  "Staj Evrakı": [
    { label: "Ad Soyad", required: true, present: false },
    { label: "Öğrenci No", required: true, present: false },
    { label: "Staj Dönemi", required: true, present: false },
    { label: "Tarih", required: true, present: false },
    { label: "İmza", required: true, present: false },
    { label: "Kurum Adı", required: true, present: false }
  ],
  "CV Başvurusu": [
    { label: "Ad Soyad", required: true, present: false },
    { label: "İletişim Bilgisi", required: true, present: false },
    { label: "Eğitim Bilgisi", required: true, present: false },
    { label: "Deneyim", required: true, present: false },
    { label: "CV Dosyası", required: true, present: false }
  ],
  "Genel Başvuru Formu": [
    { label: "Ad Soyad", required: true, present: false },
    { label: "Başvuru Konusu", required: true, present: false },
    { label: "İletişim Bilgisi", required: true, present: false },
    { label: "Tarih", required: true, present: false },
    { label: "İmza", required: true, present: false }
  ],
  "Bilinmeyen Belge": []
};

export const RISK_FLAGS = {
  invalidSenderEmail: "Sender email formatı hatalı",
  missingAttachment: "Ek dosya bulunamadı",
  lowConfidence: "Düşük güven skoru",
  unknownDocumentType: "Bilinmeyen belge türü",
  unverifiableSignature: "İmza doğrulanamıyor",
  emptyChecklist: "Checklist tamamen boş",
  possibleDuplicate: "Aynı başvuru tekrar gelmiş olabilir"
} as const;
