import { PrimaryButton } from "./PrimaryButton";

export function CtaSection() {
  return (
    <section className="bg-white px-4 py-16 text-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg bg-neutral-950 p-8 text-white md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Demo hazır</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal">Başvuru operasyonunu akıllı kuyruklara taşıyın.</h2>
        </div>
        <PrimaryButton href="/start" className="min-h-12 px-6">
          Başla
        </PrimaryButton>
      </div>
    </section>
  );
}
