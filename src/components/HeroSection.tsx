import { BrandLogo } from "./BrandLogo";
import { PrimaryButton } from "./PrimaryButton";
import { TopNav } from "./TopNav";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950">
      <TopNav tone="dark" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div>
          <div className="mb-8">
            <BrandLogo />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">AI destekli belge ve başvuru yönetimi</p>
          <h1 className="mt-5 text-4xl font-black tracking-normal text-white sm:text-6xl">
            Belgeleri analiz eden, eksikleri bulan, süreçleri hızlandıran akıllı başvuru yönetimi.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
            QueueLess AI Inbox, iş başvurularından staj belgelerine kadar gelen dokümanları analiz eder, kategorize eder, eksik alanları tespit eder ve insan onaylı güvenli iş akışları oluşturur.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="/start" className="min-h-12 px-6">
              Başla
            </PrimaryButton>
            <PrimaryButton href="/dashboard" variant="dark" className="min-h-12 px-6">
              Demo Akışını Gör
            </PrimaryButton>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-panel">
          <div className="rounded-lg bg-neutral-900 p-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-bold uppercase text-emerald-300">Canlı demo görünümü</p>
                <p className="mt-1 text-xl font-bold">Akıllı Kuyruk Paneli</p>
              </div>
              <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-neutral-950">%66 hız</span>
            </div>
            <div className="mt-4 grid gap-3">
              {[
                ["Eksik Evrak", "2 alan eksik", "border-amber-300/50"],
                ["İncelemeye Alındı", "AI güveni %94", "border-emerald-300/50"],
                ["Riskli / Manuel Kontrol", "İmza doğrulanamıyor", "border-rose-300/50"]
              ].map(([title, detail, tone]) => (
                <div key={title} className={`rounded-lg border ${tone} bg-white/[0.04] p-4`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold">{title}</p>
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  </div>
                  <p className="mt-2 text-sm text-neutral-300">{detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-emerald-400 p-4 text-neutral-950">
              <p className="text-sm font-black">AI taslak üretir, insan onaylar.</p>
              <p className="mt-1 text-sm font-medium">Gerçek mail gönderimi yok, demo simülasyonu var.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
