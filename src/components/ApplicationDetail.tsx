import type { ApplicationRecord } from "@/types/application";
import { confidenceLabel, queueLabel, statusTone } from "@/lib/uiLabels";
import { AiDecisionPanel } from "./AiDecisionPanel";
import { ChecklistView } from "./ChecklistView";
import { EmailDraftPanel } from "./EmailDraftPanel";
import { EmptyState } from "./EmptyState";
import { StatusBadge } from "./StatusBadge";

export function ApplicationDetail({
  application,
  isCompleted,
  onApprove
}: {
  application: ApplicationRecord | null;
  isCompleted: boolean;
  onApprove: (draft: string) => void;
}) {
  if (!application) {
    return (
      <EmptyState
        title="Başvuru seçilmedi"
        description="Listeden bir başvuru seçildiğinde AI analizi, checklist ve mail taslağı burada gösterilir."
      />
    );
  }

  return (
    <aside className="space-y-4">
      {application.riskFlags.length > 0 ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold leading-6 text-rose-900">
          Bu başvuru düşük güven skoru veya doğrulanamayan imza nedeniyle manuel kontrole yönlendirilmiştir.
        </div>
      ) : null}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-normal text-slate-950">{application.subject}</h2>
            <p className="mt-2 text-sm text-slate-600">
              {application.senderName} · {application.senderEmail}
            </p>
          </div>
          <StatusBadge tone={statusTone(application.status)}>{queueLabel(application.status)}</StatusBadge>
        </div>

        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <Info label="Ek dosya adı" value={application.attachmentName ?? "Ek yok"} />
          <Info label="AI sınıflandırması" value={application.detectedApplicationType} />
          <Info label="Belge türü" value={application.documentType} />
          <Info label="Güven skoru" value={confidenceLabel(application.confidenceScore)} />
          <Info label="Önerilen kuyruk" value={queueLabel(application.status)} />
          <Info label="Öncelik" value={application.priority} />
        </div>

        <div className="mt-5 rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase text-slate-500">AI özeti</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{application.aiSummary}</p>
        </div>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase text-slate-500">Mail içeriği</p>
          <p className="mt-2 whitespace-pre-wrap rounded-lg border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700">
            {application.body}
          </p>
        </div>

        {application.riskFlags.length > 0 ? (
          <div className="mt-5">
            <p className="text-xs font-bold uppercase text-slate-500">Risk uyarıları</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {application.riskFlags.map((flag) => (
                <StatusBadge key={flag} tone="danger">{flag}</StatusBadge>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
        <h3 className="text-base font-bold text-slate-950">Checklist görünümü</h3>
        <div className="mt-4">
          <ChecklistView checklist={application.checklist} missingFields={application.missingFields} riskFlags={application.riskFlags} />
        </div>
      </section>

      <AiDecisionPanel />
      <EmailDraftPanel draft={application.generatedReplyDraft} isCompleted={isCompleted} onApprove={onApprove} />
    </aside>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
