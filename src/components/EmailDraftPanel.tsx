"use client";

import { useEffect, useState } from "react";

export function EmailDraftPanel({
  draft,
  isCompleted,
  isRisky,
  onDraftChange,
  onApprove
}: {
  draft: string;
  isCompleted: boolean;
  isRisky: boolean;
  onDraftChange: (draft: string) => void;
  onApprove: (draft: string) => void;
}) {
  const [editedDraft, setEditedDraft] = useState(draft);
  const [simulationMessage, setSimulationMessage] = useState("");

  useEffect(() => {
    setEditedDraft(draft);
    setSimulationMessage("");
  }, [draft]);

  function handleDraftChange(value: string) {
    setEditedDraft(value);
    onDraftChange(value);
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-950">İnsan onaylı mail taslağı</h3>
          <p className="mt-1 text-sm text-slate-600">AI yalnızca düzenlenebilir taslak oluşturur; gerçek mail gönderimi yoktur.</p>
        </div>
        {isCompleted ? (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">Tamamlandı</span>
        ) : null}
      </div>

      {isRisky ? (
        <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-semibold leading-6 text-rose-900">
          Riskli başvurularda taslak otomatik onaya uygun değildir. Manuel kontrol tamamlanmadan gönderim simülasyonu yapılamaz.
        </div>
      ) : null}

      <textarea
        value={editedDraft}
        onChange={(event) => handleDraftChange(event.target.value)}
        rows={10}
        className="mt-4 w-full resize-y rounded-lg border border-slate-300 bg-white p-3 text-sm leading-6 text-slate-800"
        aria-label="Düzenlenebilir AI mail taslağı"
      />

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => handleDraftChange(editedDraft)}
          className="min-h-11 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
        >
          Taslağı Düzenle
        </button>
        <button
          type="button"
          disabled={isCompleted || isRisky}
          onClick={() => {
            if (isRisky) {
              return;
            }
            onApprove(editedDraft);
            setSimulationMessage("Mail gönderildi olarak simüle edildi.");
          }}
          className="min-h-11 rounded-md bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Maili Onayla ve Gönder
        </button>
      </div>

      {simulationMessage ? (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-900">
          {simulationMessage}
        </div>
      ) : null}
    </div>
  );
}
