import type { ProductQueue } from "@/types/application";

const queueLabels = [
  "Gelen Başvurular",
  "Eksik Evrak",
  "İncelemeye Alındı",
  "Onay Bekleyen Yanıtlar",
  "Riskli / Manuel Kontrol",
  "Tamamlananlar"
] as const;

export function queueLabel(queue: ProductQueue): string {
  const queueOrder: ProductQueue[] = [
    "Gelen Başvurular",
    "Eksik Evrak",
    "İncelemeye Alındı",
    "Onay Bekleyen Yanıtlar",
    "Riskli / Manuel Kontrol",
    "Tamamlananlar"
  ];
  const index = queueOrder.findIndex((item) => item === queue);

  return queueLabels[index] ?? queue;
}

export function confidenceLabel(score: number): string {
  return `%${Math.round(score * 100)}`;
}

export function statusTone(queue: ProductQueue): "neutral" | "warning" | "success" | "danger" | "info" {
  const label = queueLabel(queue);

  if (label === "Riskli / Manuel Kontrol") {
    return "danger";
  }

  if (label === "Eksik Evrak") {
    return "warning";
  }

  if (label === "Tamamlananlar") {
    return "success";
  }

  if (label === "İncelemeye Alındı" || label === "Onay Bekleyen Yanıtlar") {
    return "info";
  }

  return "neutral";
}
