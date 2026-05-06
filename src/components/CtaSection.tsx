import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-white px-4 py-16 text-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg bg-neutral-950 p-8 text-white md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Demo hazır</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal">Başvuru operasyonunu akıllı kuyruklara taşıyın.</h2>
        </div>
        <Link href="/start" className="inline-flex min-h-12 items-center justify-center rounded-md bg-emerald-400 px-6 text-sm font-black text-neutral-950 transition hover:bg-emerald-300">
          Başla
        </Link>
      </div>
    </section>
  );
}
