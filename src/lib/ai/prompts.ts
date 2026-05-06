import type { UploadedTextFile } from "./schemas.ts";

export function getBaseSystemPrompt(): string {
  return [
    "Sadece geçerli JSON döndür.",
    "Markdown, açıklama, kod bloğu veya JSON dışı metin kullanma.",
    "Uydurma yapma; bilgi yoksa \"bulunamadı\" de.",
    "Sadece verilen iş ilanı, PDF metni, dosya adı ve extractionError bilgisine dayan.",
    "Hassas veri üretme veya tahmin etme.",
    "Mail gönderme; sadece insan onayına hazır taslak üret.",
    "İnsan onayı zorunludur.",
    "Riskli, düşük güvenli, boş metinli veya belirsiz belgeleri manuel kontrole gönder."
  ].join(" ");
}

export function buildRecruitmentAnalysisPrompt(jobText: string, cvTexts: UploadedTextFile[]): string {
  return [
    "İş ilanı ve CV PDF metinlerini analiz et.",
    "Bu istekte PDF dosyaları ayrıca inline attachment olarak eklenmiş olabilir; metin çıkarımı boşsa ekli PDF içeriğini doğrudan oku.",
    "İş ilanını özetle, temel yetkinlikleri çıkar, her CV için uygunluk skoru, eksikler, riskler ve kategori üret.",
    "matchScore 0-100 arasında olmalı.",
    "Belirsiz CV'lerde kategori \"Eksik Bilgi\" olmalı.",
    "PDF metni boşsa veya extractionError varsa ama inline attachment içeriği okunabiliyorsa analizi ekli PDF dosyasına göre yap; extractionError sadece yerel metin çıkarma uyarısıdır.",
    "Hem metin hem inline PDF içeriği anlaşılamıyorsa aday için matchScore düşük olmalı, category \"Eksik Bilgi\" olmalı, risks içinde okunamayan PDF bilgisi yer almalı ve recommendedAction manuel kontrol önermeli.",
    "Aday ismi bulunamazsa \"Bilinmeyen Aday\" yaz.",
    "Her aday için insan onayına hazır ama gönderilmeyen bir cevap maili taslağı üret.",
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
        aiSummary: "string",
        generatedReplyDraft: "string"
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
    "Bu istekte PDF dosyaları ayrıca inline attachment olarak eklenmiş olabilir; metin çıkarımı boşsa ekli PDF içeriğini doğrudan oku.",
    `Kullanıcının seçtiği belge tipi: ${documentType?.trim() || "Bilinmeyen Belge"}`,
    "Belge türünü tahmin et, checklist çıkar, eksik alanları ve riskleri bul, önerilen kuyruğu belirle.",
    "PDF metni boşsa veya extractionError varsa ama inline attachment içeriği okunabiliyorsa belgeyi ekli PDF dosyasına göre analiz et; extractionError sadece yerel metin çıkarma uyarısıdır.",
    "Hem metin hem inline PDF içeriği anlaşılamıyorsa recommendedQueue = Riskli / Manuel Kontrol, confidenceScore düşük, missingFields içinde okunabilir PDF metni ve riskFlags içinde PDF metni okunamadı bilgisi olmalı.",
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
