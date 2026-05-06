"use client";

import { useState } from "react";
import { analyzeRecruitment, type ApiAnalysisResponse } from "@/lib/api/analyzeClient";
import type { RecruitmentAnalysisResult } from "@/lib/ai/schemas";
import { InfoCard } from "./InfoCard";
import { PrimaryButton } from "./PrimaryButton";

export function JobPostingAnalyzerPanel() {
  const [jobLink, setJobLink] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<ApiAnalysisResponse<RecruitmentAnalysisResult> | null>(null);
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  async function handleAnalyze() {
    setError("");
    setResult(null);
    setIsAnalyzing(true);

    try {
      setResult(await analyzeRecruitment(jobLink, files, jobDescriptionText));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Analiz tamamlanamadı.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <InfoCard title="İş ilanı analizi" description="İlan linki veya manuel ilan metni ile PDF CV belgelerini Ollama destekli analiz edin.">
      <label className="mt-4 block text-sm font-bold text-neutral-700" htmlFor="job-link">İş ilanı linki</label>
      <textarea
        id="job-link"
        value={jobLink}
        onChange={(event) => setJobLink(event.target.value)}
        placeholder="İş ilanı bağlantısını buraya yapıştırın"
        rows={3}
        className="mt-2 w-full rounded-md border border-slate-300 bg-white p-3 text-sm text-slate-900"
      />

      <label className="mt-4 block text-sm font-bold text-neutral-700" htmlFor="job-description">Manuel ilan metni</label>
      <textarea
        id="job-description"
        value={jobDescriptionText}
        onChange={(event) => setJobDescriptionText(event.target.value)}
        placeholder="Link okunamazsa iş ilanı metnini buraya ekleyin"
        rows={5}
        className="mt-2 w-full rounded-md border border-slate-300 bg-white p-3 text-sm text-slate-900"
      />

      <label className="mt-4 block rounded-lg border border-dashed border-emerald-400 bg-emerald-50 p-4 text-sm font-bold text-slate-900">
        PDF CV dosyaları
        <input
          type="file"
          accept="application/pdf,.pdf"
          multiple
          className="mt-3 block w-full text-sm font-medium text-slate-700"
          onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
        />
      </label>

      <PrimaryButton onClick={handleAnalyze} className="mt-3">
        {isAnalyzing ? "Analiz ediliyor" : "İlan ve CV'leri Analiz Et"}
      </PrimaryButton>

      {error ? (
        <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-900">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-neutral-800">
          <p className="font-black">Mod: {result.mode}</p>
          {result.warning ? <p className="mt-2 font-semibold text-amber-800">{result.warning}</p> : null}
          <p className="mt-2">{result.data.jobSummary}</p>
          <div className="mt-3 space-y-2">
            {result.data.candidates.map((candidate) => (
              <div key={candidate.fileName} className="rounded-md border border-emerald-200 bg-white p-3">
                <p className="font-black">{candidate.candidateName} - {candidate.matchScore}/100</p>
                <p className="mt-1">Kategori: {candidate.category}</p>
                <p className="mt-1">{candidate.aiSummary}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </InfoCard>
  );
}
