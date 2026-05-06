import type { ApplicationRecord } from "@/types/application";
import { confidenceLabel, queueLabel, statusTone } from "@/lib/uiLabels";
import { EmptyState } from "./EmptyState";
import { StatusBadge } from "./StatusBadge";

export function ApplicationList({
  applications,
  selectedId,
  onSelect
}: {
  applications: ApplicationRecord[];
  selectedId: string | null;
  onSelect: (application: ApplicationRecord) => void;
}) {
  if (applications.length === 0) {
    return (
      <EmptyState
        title="Bu kuyrukta başvuru yok"
        description="Filtreyi değiştirerek diğer kuyruklardaki mock başvuruları inceleyebilirsiniz."
      />
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((application) => {
        const isSelected = selectedId === application.id;

        return (
          <button
            key={application.id}
            type="button"
            onClick={() => onSelect(application)}
            className={`w-full rounded-lg border bg-white p-4 text-left shadow-panel transition ${
              isSelected ? "border-slate-900 ring-2 ring-slate-900/10" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-base font-bold text-slate-950">{application.senderName}</h2>
                  <StatusBadge tone={statusTone(application.status)}>{queueLabel(application.status)}</StatusBadge>
                  <StatusBadge tone={application.priority === "Kritik" ? "danger" : application.priority === "Yüksek" ? "warning" : "neutral"}>
                    {application.priority}
                  </StatusBadge>
                </div>
                <p className="mt-1 break-words text-sm text-slate-600">{application.senderEmail}</p>
                <p className="mt-3 text-sm font-semibold text-slate-900">{application.subject}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{application.aiSummary}</p>
              </div>
              <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-3 lg:min-w-80 lg:grid-cols-1">
                <span>
                  <strong className="block text-xs uppercase text-slate-400">Ek</strong>
                  {application.attachmentName ?? "Ek yok"}
                </span>
                <span>
                  <strong className="block text-xs uppercase text-slate-400">Belge</strong>
                  {application.documentType} / {application.detectedApplicationType}
                </span>
                <span>
                  <strong className="block text-xs uppercase text-slate-400">AI Güven</strong>
                  {confidenceLabel(application.confidenceScore)}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
