import Link from "next/link";
import { AcademicDocumentAnalyzerPanel } from "./AcademicDocumentAnalyzerPanel";
import { DocumentQueueBoard } from "./DocumentQueueBoard";
import { SiteHeader } from "./SiteHeader";

export function AcademicFlow() {
  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/start" className="text-sm font-bold text-emerald-700">← Akış seçimine dön</Link>
        <div className="mt-4 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Akademik / Staj Belge Analizi</p>
          <h1 className="mt-3 text-4xl font-black tracking-normal">Staj ve akademik belgeleri checklist tabanlı inceleme akışına alın.</h1>
          <p className="mt-4 text-base leading-7 text-neutral-600">
            Hoca, danışman veya görevli kullanıcı; belge türünü seçer, PDF listesini hazırlar, eksikleri ve riskli noktaları tek ekranda görür.
          </p>
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
