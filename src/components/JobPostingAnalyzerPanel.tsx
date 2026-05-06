"use client";

import { useState } from "react";

export function JobPostingAnalyzerPanel() {
  const [jobLink, setJobLink] = useState("");
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-panel">
      <h2 className="text-lg font-black text-neutral-950">İş ilanı analizi</h2>
      <label className="mt-4 block text-sm font-bold text-neutral-700" htmlFor="job-link">İş İlanı Linki</label>
      <textarea
        id="job-link"
        value={jobLink}
        onChange={(event) => setJobLink(event.target.value)}
        placeholder="İş ilanı bağlantısını buraya yapıştırın"
        rows={4}
        className="mt-2 w-full rounded-md border border-neutral-300 p-3 text-sm text-neutral-900"
      />
      <button
        type="button"
        onClick={() => setIsAnalyzed(true)}
        className="mt-3 min-h-11 rounded-md bg-neutral-950 px-4 text-sm font-black text-white transition hover:bg-neutral-800"
      >
        İlanı Analiz Et
      </button>

      {isAnalyzed ? (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-neutral-800">
          <p className="font-black">Pozisyon adı: Frontend Developer</p>
          <p className="mt-2">Beklenen yetkinlikler: React, TypeScript, UI sistemleri, dokümantasyon disiplini.</p>
          <p className="mt-2">Deneyim seviyesi: Junior / Mid.</p>
          <p className="mt-2">Temel kriterler: portfolyo, iletişim bilgisi, proje deneyimi, PDF CV.</p>
        </div>
      ) : null}
    </div>
  );
}
