import { queueLabel } from "@/lib/uiLabels";
import type { ProductQueue } from "@/types/application";
import type { DashboardApplication } from "@/types/dashboard";

type MetricCard = {
  label: string;
  value: string | number;
  detail: string;
  accent: string;
};

export function DashboardCards({
  applications,
  queues
}: {
  applications: DashboardApplication[];
  queues: readonly ProductQueue[];
}) {
  const countByRecommendedQueue = new Map<ProductQueue, number>();

  for (const queue of queues) {
    countByRecommendedQueue.set(queue, applications.filter((application) => application.recommendedQueue === queue).length);
  }

  const today = applications.filter((application) => application.createdAt.startsWith("2026-05-06")).length;
  const awaitingApproval = applications.filter((application) =>
    Boolean(application.generatedReplyDraft)
    && application.status !== queues[5]
    && application.recommendedQueue !== queues[4]
  ).length;
  const metrics: MetricCard[] = [
    { label: "Bugün Gelen", value: today, detail: "Mock inbox başvuruları", accent: "border-l-blue-500" },
    { label: "Eksik Evrak", value: countByRecommendedQueue.get(queues[1]) ?? 0, detail: "AI önerisi", accent: "border-l-amber-500" },
    { label: "İncelemeye Alındı", value: countByRecommendedQueue.get(queues[2]) ?? 0, detail: "AI önerisi", accent: "border-l-cyan-500" },
    { label: "Onay Bekleyen Yanıtlar", value: awaitingApproval, detail: "İnsan onayı bekler", accent: "border-l-indigo-500" },
    { label: "Riskli / Manuel Kontrol", value: countByRecommendedQueue.get(queues[4]) ?? 0, detail: queueLabel(queues[4]), accent: "border-l-rose-500" },
    { label: "Ortalama Zaman Kazancı", value: "%66", detail: "6 dakikadan 2 dakikaya", accent: "border-l-emerald-500" }
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
      {metrics.map((metric) => (
        <article key={metric.label} className={`rounded-lg border border-slate-200 border-l-4 ${metric.accent} bg-white p-4 shadow-panel`}>
          <p className="text-sm font-medium text-slate-500">{metric.label}</p>
          <p className="mt-3 text-3xl font-bold tracking-normal text-slate-950">{metric.value}</p>
          <p className="mt-2 text-xs font-medium text-slate-500">{metric.detail}</p>
        </article>
      ))}
    </section>
  );
}
