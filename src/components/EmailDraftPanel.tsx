"use client";

import { useEffect, useState } from "react";

export function EmailDraftPanel({
  draft,
  isCompleted,
  onApprove
}: {
  draft: string;
  isCompleted: boolean;
  onApprove: (draft: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDraft, setEditedDraft] = useState(draft);
  const [simulationMessage, setSimulationMessage] = useState("");

  useEffect(() => {
    setEditedDraft(draft);
    setIsEditing(false);
    setSimulationMessage("");
  }, [draft]);

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

      {isEditing ? (
        <textarea
          value={editedDraft}
          onChange={(event) => setEditedDraft(event.target.value)}
          rows={9}
          className="mt-4 w-full resize-y rounded-lg border border-slate-300 bg-white p-3 text-sm leading-6 text-slate-800"
        />
      ) : (
        <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-800">
          {editedDraft}
        </pre>
      )}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => setIsEditing((value) => !value)}
          className="min-h-11 rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
        >
          Taslağı Düzenle
        </button>
        <button
          type="button"
          disabled={isCompleted}
          onClick={() => {
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
