import Link from "next/link";
import { HumanApprovalNotice } from "@/components/HumanApprovalNotice";
import { InfoCard } from "@/components/InfoCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionTitle } from "@/components/SectionTitle";
import { TopNav } from "@/components/TopNav";

const flows = [
  {
    title: "İşe Alım / CV Analizi",
    description: "İş ilanı linkini baz alarak CV belgelerini kategorize edin, eksik alanları görün ve adayları doğru inceleme kuyruğuna taşıyın.",
    href: "/recruitment",
    meta: "CV eşleştirme · PDF analizi · aday kategorileri",
    icon: "CV"
  },
  {
    title: "Staj / Belge Analizi",
    description: "Staj evrakı, başvuru formu ve akademik belgeleri checklist ile kontrol edip riskli kayıtları manuel kontrole ayırın.",
    href: "/academic",
    meta: "Staj belgeleri · eksik evrak · insan onayı",
    icon: "ST"
  }
];

export default function StartPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <TopNav tone="light" />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Başlangıç Akışı"
          title="Hangi belge akışıyla başlamak istersiniz?"
          description="QueueLess AI Inbox iki demo senaryosunu aynı dashboard tasarım diliyle sunar: işe alım CV analizi ve staj/belge kontrolü."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {flows.map((flow) => (
            <Link
              key={flow.href}
              href={flow.href}
              className="group block"
            >
              <InfoCard eyebrow={flow.meta} title={flow.title} description={flow.description}>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-950 text-sm font-black text-emerald-300">{flow.icon}</span>
                  <PrimaryButton>
                    Bu Akışla Başla
                  </PrimaryButton>
                </div>
              </InfoCard>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <HumanApprovalNotice variant="dark" />
        </div>
      </section>
    </main>
  );
}
