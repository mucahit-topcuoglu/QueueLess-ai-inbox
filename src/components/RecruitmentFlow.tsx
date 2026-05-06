import Link from "next/link";
import { JobPostingAnalyzerPanel } from "./JobPostingAnalyzerPanel";
import { SectionTitle } from "./SectionTitle";
import { TopNav } from "./TopNav";

export function RecruitmentFlow() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <TopNav tone="light" />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/start" className="text-sm font-bold text-emerald-700">Akış seçimine dön</Link>
        <div className="mt-4">
          <SectionTitle
            eyebrow="İşe Alım / CV Analizi"
            title="İş ilanına göre CV belgelerini akıllı kategorilere ayırın."
            description="İş ilanı linki veya manuel ilan metni ile PDF CV dosyaları yalnızca Ollama gemma4:31b-cloud modeliyle analiz edilir."
          />
        </div>
        <div className="mt-8">
          <JobPostingAnalyzerPanel />
        </div>
      </section>
    </main>
  );
}
