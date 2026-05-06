import Link from "next/link";

const steps = [
  "Belgeni yükle veya iş ilanı linkini gir",
  "Sistem analiz etsin ve kategorize etsin",
  "Eksikleri gör, kuyrukları yönet, insan onayıyla ilerlet"
];

const useCases = [
  {
    title: "İşe Alım ve CV Yönetimi",
    description: "CV belgelerini iş ilanı kriterleriyle eşleştir, eksik alanları ayır ve adayları inceleme kategorilerine taşı.",
    href: "/recruitment"
  },
  {
    title: "Akademik / Staj Belge Analizi",
    description: "Staj başvurusu, staj defteri ve akademik belgeleri checklist üzerinden kontrol ederek güvenli değerlendirme akışı oluştur.",
    href: "/academic"
  }
];

export function UseCaseCards() {
  return (
    <section className="bg-neutral-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Nasıl çalışır?</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">Üç adımda başvuru operasyonu.</h2>
            <div className="mt-8 space-y-3">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-sm font-black text-neutral-950">{index + 1}</span>
                  <p className="text-sm font-semibold leading-6 text-neutral-200">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {useCases.map((useCase) => (
              <article key={useCase.href} className="rounded-lg border border-white/10 bg-white/[0.05] p-6">
                <h3 className="text-2xl font-black">{useCase.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-300">{useCase.description}</p>
                <Link href={useCase.href} className="mt-6 inline-flex min-h-11 items-center rounded-md bg-emerald-400 px-4 text-sm font-black text-neutral-950 transition hover:bg-emerald-300">
                  Bu Akışla Başla
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
