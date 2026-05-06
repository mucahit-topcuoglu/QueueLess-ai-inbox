import Link from "next/link";
import { AcademicDocumentAnalyzerPanel } from "./AcademicDocumentAnalyzerPanel";
import { DocumentQueueBoard } from "./DocumentQueueBoard";
import { SectionTitle } from "./SectionTitle";
import { TopNav } from "./TopNav";

export function AcademicFlow() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <TopNav tone="light" />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/start" className="text-sm font-bold text-emerald-700">← Akış seçimine dön</Link>
        <div className="mt-4">
          <SectionTitle
            eyebrow="Staj / Belge Analizi"
            title="Staj ve akademik belgeleri checklist tabanlı inceleme akışına alın."
            description="Hoca, danışman veya görevli kullanıcı; belge türünü seçer, PDF listesini hazırlar, eksikleri ve riskli noktaları tek ekranda görür."
          />
        </div>
        <div className="mt-8">
          <AcademicDocumentAnalyzerPanel />
        </div>
        <div className="mt-5">
          <DocumentQueueBoard />
        </div>
      </section>
    </main>
  );
}
