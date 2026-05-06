import { InfoCard } from "./InfoCard";
import { PageSection } from "./PageSection";
import { PrimaryButton } from "./PrimaryButton";
import { SectionTitle } from "./SectionTitle";

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
    <PageSection tone="dark">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle
              eyebrow="Nasıl çalışır?"
              title="Üç adımda başvuru operasyonu."
              tone="dark"
            />
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
              <InfoCard key={useCase.href} tone="dark" title={useCase.title} description={useCase.description}>
                <PrimaryButton href={useCase.href}>
                  Bu Akışla Başla
                </PrimaryButton>
              </InfoCard>
            ))}
          </div>
        </div>
    </PageSection>
  );
}
