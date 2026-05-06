const features = [
  "PDF ve belge analizi",
  "Eksik evrak tespiti",
  "Kategoriye göre ayırma",
  "İş ilanına göre CV eşleştirme",
  "Staj / akademik belge analizi",
  "İnsan onaylı güvenli süreç",
  "Zaman kazancı",
  "Kolay dashboard yönetimi"
];

export function FeatureSection() {
  return (
    <section className="bg-white px-4 py-16 text-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Değer önerisi</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">Manuel belge kontrolünü tek ekranda yönetilebilir hale getirir.</h2>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article key={feature} className="rounded-lg border border-neutral-200 bg-neutral-50 p-5">
              <div className="h-2 w-12 rounded-full bg-emerald-500" />
              <h3 className="mt-5 text-lg font-bold">{feature}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">Demo akışında mock data ile görünür, ileride gerçek servislerle bağlanabilir.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
