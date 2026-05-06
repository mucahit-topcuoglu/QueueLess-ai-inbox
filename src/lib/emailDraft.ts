import type { AnalyzerResult, ApplicationRecord } from "../types/application.ts";

type DraftInput = Pick<ApplicationRecord, "senderName"> &
  Pick<AnalyzerResult, "missingFields" | "riskFlags" | "recommendedQueue">;

export function createReplyDraft(input: DraftInput): string {
  if (input.recommendedQueue === "Riskli / Manuel Kontrol") {
    const riskText = input.riskFlags.length > 0
      ? input.riskFlags.map((flag) => `- ${flag}`).join("\n")
      : "- Manuel kontrol gerekli";

    return [
      `Merhaba ${input.senderName},`,
      "",
      "Başvurunuz ön kontrolden geçirilmiştir ancak otomatik taslak gönderimine uygun değildir.",
      "Manuel kontrol gerekli görülen noktalar:",
      riskText,
      "",
      "Bu taslak yalnızca görevli insanın incelemesi için oluşturulmuştur.",
      "İyi çalışmalar."
    ].join("\n");
  }

  if (input.missingFields.length > 0) {
    const missingText = input.missingFields.map((field) => `- ${field}`).join("\n");

    return [
      `Merhaba ${input.senderName},`,
      "",
      "Başvurunuz ön kontrolden geçirilmiştir. Evrakınızda aşağıdaki eksikler tespit edilmiştir:",
      missingText,
      "Lütfen eksikleri tamamlayarak belgenizi tekrar iletiniz.",
      "",
      "İyi çalışmalar."
    ].join("\n");
  }

  return [
    `Merhaba ${input.senderName},`,
    "",
    "Belgeleriniz başarıyla alınmış ve ön kontrolden geçirilmiştir. Zorunlu alanlar açısından eksik tespit edilmemiştir.",
    "Başvurunuz inceleme sürecine alınmıştır.",
    "",
    "İyi çalışmalar."
  ].join("\n");
}
