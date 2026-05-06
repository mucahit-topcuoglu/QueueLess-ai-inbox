import type { ChecklistItem } from "@/types/application";
import { StatusBadge } from "./StatusBadge";

export function ChecklistView({
  checklist,
  missingFields,
  riskFlags
}: {
  checklist: ChecklistItem[];
  missingFields: string[];
  riskFlags: string[];
}) {
  if (checklist.length === 0) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
        Checklist uygulanamadı. Bu belge türü manuel kontrole yönlendirildi.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full border-collapse bg-white text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Alan adı</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Açıklama</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {checklist.map((item) => {
              const hasRisk = !item.present && riskFlags.length > 0;
              const status = item.present ? "Var" : hasRisk ? "Riskli" : "Eksik";

              return (
                <tr key={item.label}>
                  <td className="px-4 py-3 font-medium text-slate-900">{item.label}</td>
                  <td className="px-4 py-3">
                    <StatusBadge tone={item.present ? "success" : hasRisk ? "danger" : "warning"}>{status}</StatusBadge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {item.present
                      ? "Alan başvuru içeriğinde bulundu."
                      : item.required
                        ? "Zorunlu alan eksik veya doğrulanamadı."
                        : "Opsiyonel alan bulunamadı."}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <p className="text-sm font-bold text-slate-900">Eksik alanlar</p>
        {missingFields.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-2">
            {missingFields.map((field) => (
              <li key={field}>
                <StatusBadge tone="warning">{field}</StatusBadge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-slate-600">Zorunlu alanlarda eksik tespit edilmedi.</p>
        )}
      </div>
    </div>
  );
}
