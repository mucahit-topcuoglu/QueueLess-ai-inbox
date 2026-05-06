import { InfoCard } from "./InfoCard";
import { PageSection } from "./PageSection";
import { SectionTitle } from "./SectionTitle";

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
    <PageSection>
      <SectionTitle
        eyebrow="Değer önerisi"
        title="Manuel belge kontrolünü tek ekranda yönetilebilir hale getirir."
      />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <InfoCard key={feature} title={feature} description="Demo akışında mock data ile görünür, ileride gerçek servislerle bağlanabilir.">
              <div className="h-2 w-12 rounded-full bg-emerald-500" />
            </InfoCard>
          ))}
        </div>
    </PageSection>
  );
}
