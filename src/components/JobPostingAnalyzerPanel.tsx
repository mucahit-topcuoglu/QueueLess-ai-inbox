"use client";

import { useState } from "react";
import { InfoCard } from "./InfoCard";
import { PrimaryButton } from "./PrimaryButton";

export function JobPostingAnalyzerPanel() {
  const [jobLink, setJobLink] = useState("");
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  return (
    <InfoCard title="İş ilanı analizi" description="İlan linkini demo input alanına ekleyin ve mock kriter özetini görün.">
      <label className="mt-4 block text-sm font-bold text-neutral-700" htmlFor="job-link">İş İlanı Linki</label>
      <textarea
        id="job-link"
        value={jobLink}
        onChange={(event) => setJobLink(event.target.value)}
        placeholder="İş ilanı bağlantısını buraya yapıştırın"
        rows={4}
        className="mt-2 w-full rounded-md border border-slate-300 bg-white p-3 text-sm text-slate-900"
      />
      <PrimaryButton onClick={() => setIsAnalyzed(true)} className="mt-3">
        İlanı Analiz Et
      </PrimaryButton>

      {isAnalyzed ? (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-neutral-800">
          <p className="font-black">Pozisyon adı: Frontend Developer</p>
          <p className="mt-2">Beklenen yetkinlikler: React, TypeScript, UI sistemleri, dokümantasyon disiplini.</p>
          <p className="mt-2">Deneyim seviyesi: Junior / Mid.</p>
          <p className="mt-2">Temel kriterler: portfolyo, iletişim bilgisi, proje deneyimi, PDF CV.</p>
        </div>
      ) : null}
    </InfoCard>
  );
}
