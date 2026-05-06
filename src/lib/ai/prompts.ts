import type { UploadedTextFile } from "./schemas.ts";

export const AI_SYSTEM_PROMPT = [
  "Sadece geçerli JSON döndür.",
  "Markdown, açıklama, kod bloğu veya JSON dışı metin kullanma.",
  "Uydurma yapma; belirsizse \"bulunamadı\" yaz.",
  "Sadece verilen PDF metinleri ve iş ilanı metnine dayan.",
  "Hassas veri üretme veya tahmin etme.",
  "İnsan onayı gerektiren işlemleri otomatik tamamlanmış gibi gösterme.",
  "Riskli veya düşük güvenli durumları manuel kontrole yönlendir.",
  "Gerçek mail gönderimi yoktur; yalnızca düzenlenebilir cevap taslağı üret."
].join(" ");

export function buildRecruitmentAnalysisPrompt(jobText: string, cvTexts: UploadedTextFile[]): string {
  return [
    "İş ilanı ve CV PDF metinlerini analiz et.",
    "İş ilanını özetle, temel yetkinlikleri çıkar, her CV için uygunluk skoru ve kategori üret.",
    "matchScore 0-100 arasında olmalı.",
    "Aday ismi bulunamazsa \"Bilinmeyen Aday\" yaz.",
    "Beklenen JSON şeması:",
    JSON.stringify({
      jobSummary: "string",
      requiredSkills: ["string"],
      niceToHaveSkills: ["string"],
      candidates: [{
        fileName: "string",
        candidateName: "string",
        matchScore: 0,
        category: "Uygun | Değerlendirilebilir | Eksik Bilgi | Uygun Değil",
        strengths: ["string"],
        missingFields: ["string"],
        risks: ["string"],
        recommendedAction: "string",
        aiSummary: "string"
      }],
      overallSummary: "string"
    }),
    "İş ilanı metni:",
    jobText,
    "CV metinleri:",
    JSON.stringify(cvTexts)
  ].join("\n\n");
}

export function buildDocumentAnalysisPrompt(documentType: string | undefined, documentTexts: UploadedTextFile[]): string {
  return [
    "PDF belge metinlerini staj/belge başvuru kontrol akışına göre analiz et.",
    `Kullanıcının seçtiği belge tipi: ${documentType?.trim() || "Bilinmeyen Belge"}`,
    "Belge türünü tahmin et, checklist çıkar, eksik alanları ve riskleri bul, önerilen kuyruğu belirle.",
    "Eksik alan varsa recommendedQueue = Eksik Evrak.",
    "Eksik yoksa recommendedQueue = İncelemeye Alındı.",
    "Düşük güven, imza doğrulanamıyor veya bilinmeyen belge varsa recommendedQueue = Riskli / Manuel Kontrol.",
    "Cevap gerçek mail değildir, sadece insan onayına hazır taslaktır.",
    "Beklenen JSON şeması:",
    JSON.stringify({
      documents: [{
        fileName: "string",
        detectedDocumentType: "string",
        confidenceScore: 0,
        recommendedQueue: "Eksik Evrak | İncelemeye Alındı | Riskli / Manuel Kontrol",
        checklist: [{ field: "string", status: "Var | Eksik | Riskli", note: "string" }],
        missingFields: ["string"],
        riskFlags: ["string"],
        aiSummary: "string",
        generatedReplyDraft: "string"
      }],
      overallSummary: "string"
    }),
    "Belge metinleri:",
    JSON.stringify(documentTexts)
  ].join("\n\n");
}
