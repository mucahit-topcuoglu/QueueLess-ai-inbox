"use client";

import { useState } from "react";
import { PdfUploadPanel } from "./PdfUploadPanel";

const documentTypes = ["Staj Başvuru Belgesi", "Staj Evrakı", "Staj Defteri", "Başvuru Formu", "Genel Akademik Belge"];

export function AcademicDocumentAnalyzerPanel() {
  const [documentType, setDocumentType] = useState(documentTypes[0]);

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-panel">
        <h2 className="text-lg font-black text-neutral-950">Belge türü seçimi</h2>
        <div className="mt-4 grid gap-2">
          {documentTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setDocumentType(type)}
              className={`min-h-11 rounded-md border px-3 text-left text-sm font-bold transition ${
                documentType === type ? "border-emerald-500 bg-emerald-50 text-emerald-950" : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-neutral-950 p-4 text-sm text-white">
          <p className="font-black">Seçili belge: {documentType}</p>
          <p className="mt-2 text-neutral-300">Checklist ve kuyruk önizlemesi bu belge türüne göre gösterilir.</p>
        </div>
      </div>
      <PdfUploadPanel title="Akademik PDF yükleme" description="Staj evrakı, staj defteri veya başvuru formu PDF dosyalarını demo listesine ekleyin." />
    </div>
  );
}
