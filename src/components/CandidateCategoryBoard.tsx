"use client";

import { useState } from "react";
import { HumanApprovalNotice } from "./HumanApprovalNotice";

const candidates = [
  {
    name: "Ayşe Demo",
    category: "Uygun Adaylar",
    documentType: "PDF CV",
    missing: ["Portfolyo linki"],
    risks: [],
    skills: ["React", "TypeScript", "Tailwind"],
    summary: "İş ilanındaki frontend kriterleriyle yüksek eşleşme gösteriyor."
  },
  {
    name: "Mert Demo",
    category: "Daha Fazla İnceleme Gerekenler",
    documentType: "PDF CV",
    missing: ["Referans bilgisi"],
    risks: ["Deneyim seviyesi net değil"],
    skills: ["JavaScript", "UI testing"],
    summary: "Teknik beceriler uygun, deneyim detayı manuel incelenmeli."
  },
  {
    name: "Selin Demo",
    category: "Eksik Belgeli Başvurular",
    documentType: "Eksik PDF",
    missing: ["CV dosyası", "İletişim bilgisi"],
    risks: [],
    skills: ["Akademik proje"],
    summary: "Başvuru eksik belge nedeniyle tamamlanmaya ihtiyaç duyuyor."
  }
];

const categories = ["Uygun Adaylar", "Daha Fazla İnceleme Gerekenler", "Eksik Belgeli Başvurular", "Uygun Olmayan / Düşük Eşleşme", "Manuel Kontrol"];

export function CandidateCategoryBoard() {
  const [selectedName, setSelectedName] = useState(candidates[0].name);
  const selected = candidates.find((candidate) => candidate.name === selectedName) ?? candidates[0];

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-panel">
        <h2 className="text-lg font-black text-neutral-950">AI sonuçları ve kategoriler</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <p className="font-bold text-neutral-900">{category}</p>
              <div className="mt-3 space-y-2">
                {candidates.filter((candidate) => candidate.category === category).map((candidate) => (
                  <button
                    key={candidate.name}
                    type="button"
                    onClick={() => setSelectedName(candidate.name)}
                    className="w-full rounded-md border border-neutral-200 bg-white p-3 text-left text-sm transition hover:border-emerald-400"
                  >
                    <span className="font-black text-neutral-950">{candidate.name}</span>
                    <span className="mt-1 block text-neutral-600">{candidate.summary}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="space-y-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-panel">
        <h2 className="text-lg font-black text-neutral-950">{selected.name}</h2>
        <p className="text-sm text-neutral-600">Belge türü: {selected.documentType}</p>
        <Info title="İş ilanına göre eşleşme özeti" items={[selected.summary]} />
        <Info title="Tespit edilen ana beceriler" items={selected.skills} />
        <Info title="Eksik bilgiler" items={selected.missing} />
        <Info title="Riskli noktalar" items={selected.risks.length ? selected.risks : ["Riskli nokta bulunmadı"]} />
        <div className="grid gap-2 sm:grid-cols-2">
          {["İncelemeye Al", "Eksik Evrak Olarak İşaretle", "Manuel Kontrole Gönder", "Not Ekle"].map((action) => (
            <button key={action} type="button" className="min-h-10 rounded-md border border-neutral-300 px-3 text-sm font-bold text-neutral-800 transition hover:bg-neutral-100">
              {action}
            </button>
          ))}
        </div>
        <HumanApprovalNotice />
      </aside>
    </div>
  );
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-black text-neutral-950">{title}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">{item}</li>
        ))}
      </ul>
    </div>
  );
}
