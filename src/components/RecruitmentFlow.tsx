import Link from "next/link";
import { CandidateCategoryBoard } from "./CandidateCategoryBoard";
import { JobPostingAnalyzerPanel } from "./JobPostingAnalyzerPanel";
import { PdfUploadPanel } from "./PdfUploadPanel";
import { SiteHeader } from "./SiteHeader";

export function RecruitmentFlow() {
  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/start" className="text-sm font-bold text-emerald-700">← Akış seçimine dön</Link>
        <div className="mt-4 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">İşe Alım / CV Analizi</p>
          <h1 className="mt-3 text-4xl font-black tracking-normal">İş ilanına göre CV belgelerini akıllı kategorilere ayırın.</h1>
          <p className="mt-4 text-base leading-7 text-neutral-600">İş ilanı linki ve PDF CV alanları frontend demo state’i ile çalışır; gerçek backend veya AI API çağrısı yapılmaz.</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <JobPostingAnalyzerPanel />
          <PdfUploadPanel title="CV / PDF yükleme" description="Birden fazla CV veya destekleyici PDF belgesi seçilebilir gibi tasarlanmıştır." />
        </div>
        <div className="mt-5">
          <CandidateCategoryBoard />
        </div>
      </section>
    </main>
  );
}
