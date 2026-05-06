export function AiDecisionPanel() {
  const decisions = [
    "Mail konusu incelendi.",
    "Ek dosya adı incelendi.",
    "Belge türü tahmin edildi.",
    "Checklist kontrolü uygulandı.",
    "Eksik alanlar çıkarıldı.",
    "Güven skoruna göre kuyruk önerildi.",
    "Risk varsa manuel kontrole yönlendirildi."
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-base font-bold text-slate-950">AI nasıl karar verdi?</h3>
      <ol className="mt-4 space-y-3">
        {decisions.map((decision, index) => (
          <li key={decision} className="flex gap-3 text-sm text-slate-700">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              {index + 1}
            </span>
            <span>{decision}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
