"use client";

import { useState } from "react";
import { analyzeDocument, type ApiAnalysisResponse } from "@/lib/api/analyzeClient";
import type { DocumentAnalysisResult } from "@/lib/ai/schemas";

const documentTypes = ["Staj Başvuru Evrakı", "Staj Defteri", "Genel Başvuru Belgesi", "Öğrenci Belgesi / Form", "Bilinmeyen Belge"];

export function AcademicDocumentAnalyzerPanel() {
  const [documentType, setDocumentType] = useState(documentTypes[0]);
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<ApiAnalysisResponse<DocumentAnalysisResult> | null>(null);
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  async function handleAnalyze() {
    setError("");
    setResult(null);
    setIsAnalyzing(true);

    try {
      setResult(await analyzeDocument(documentType, files));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Belge analizi tamamlanamadı.");
    } finally {
      setIsAnalyzing(false);
    }
  }

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
          <p className="mt-2 text-neutral-300">Checklist ve kuyruk analizi Gemini API'ye server-side gönderilir.</p>
        </div>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-panel">
        <h2 className="text-lg font-black text-neutral-950">Akademik PDF analizi</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-600">PDF yükleyin; belge türü, eksik alanlar, riskler ve cevap taslağı Gemini API ile analiz edilir.</p>
        <label className="mt-4 block rounded-lg border border-dashed border-emerald-400 bg-emerald-50 p-4 text-sm font-bold text-slate-900">
          PDF belgeleri
          <input
            type="file"
            accept="application/pdf,.pdf"
            multiple
            className="mt-3 block w-full text-sm font-medium text-slate-700"
            onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
          />
        </label>
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="mt-3 inline-flex min-h-11 items-center justify-center rounded-md bg-emerald-400 px-4 text-sm font-black text-neutral-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isAnalyzing ? "Gemini analiz ediyor" : "Belgeleri Analiz Et"}
        </button>

        {error ? (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-900">
            {error}
          </div>
        ) : null}

        {result ? (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-neutral-800">
            <p className="font-black">Mod: {result.mode}</p>
            {result.warning ? <p className="mt-2 font-semibold text-amber-800">{result.warning}</p> : null}
            <p className="mt-2">{result.data.overallSummary}</p>
            <div className="mt-3 space-y-2">
              {result.data.documents.map((document) => (
                <div key={document.fileName} className="rounded-md border border-emerald-200 bg-white p-3">
                  <p className="font-black">{document.fileName} - {document.recommendedQueue}</p>
                  <p className="mt-1">Belge türü: {document.detectedDocumentType}</p>
                  <p className="mt-1">Güven skoru: {document.confidenceScore}/100</p>
                  <p className="mt-1">{document.aiSummary}</p>
                  {document.missingFields.length > 0 ? (
                    <div className="mt-3 rounded-md bg-amber-50 p-3 text-amber-950">
                      <p className="font-black">Eksik alanlar</p>
                      <ul className="mt-1 list-disc pl-5">
                        {document.missingFields.map((field) => <li key={field}>{field}</li>)}
                      </ul>
                    </div>
                  ) : null}
                  {document.riskFlags.length > 0 ? (
                    <div className="mt-3 rounded-md bg-rose-50 p-3 text-rose-950">
                      <p className="font-black">Riskler</p>
                      <ul className="mt-1 list-disc pl-5">
                        {document.riskFlags.map((risk) => <li key={risk}>{risk}</li>)}
                      </ul>
                    </div>
                  ) : null}
                  <div className="mt-3 rounded-md bg-slate-50 p-3">
                    <p className="font-black">Insan onayina hazir mail taslagi</p>
                    <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-5 text-slate-700">{document.generatedReplyDraft}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
