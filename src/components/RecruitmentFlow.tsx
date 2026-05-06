import Link from "next/link";
import { CandidateCategoryBoard } from "./CandidateCategoryBoard";
import { JobPostingAnalyzerPanel } from "./JobPostingAnalyzerPanel";
import { PdfUploadPanel } from "./PdfUploadPanel";
import { SectionTitle } from "./SectionTitle";
import { TopNav } from "./TopNav";

export function RecruitmentFlow() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <TopNav tone="light" />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/start" className="text-sm font-bold text-emerald-700">← Akış seçimine dön</Link>
        <div className="mt-4">
          <SectionTitle
            eyebrow="İşe Alım / CV Analizi"
            title="İş ilanına göre CV belgelerini akıllı kategorilere ayırın."
            description="İş ilanı linki ve PDF CV alanları frontend demo state'i ile çalışır; gerçek backend veya AI API çağrısı yapılmaz."
          />
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
