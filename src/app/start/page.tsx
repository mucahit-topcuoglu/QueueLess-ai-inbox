import Link from "next/link";
import { HumanApprovalNotice } from "@/components/HumanApprovalNotice";
import { SiteHeader } from "@/components/SiteHeader";

const flows = [
  {
    title: "İşe Alım / CV Analizi",
    description: "İş ilanı linkini baz alarak CV belgelerini kategorize edin, eksik alanları görün ve adayları doğru inceleme kuyruğuna taşıyın.",
    href: "/recruitment",
    meta: "CV eşleştirme · PDF analizi · aday kategorileri"
  },
  {
    title: "Akademik / Staj Belge Analizi",
    description: "Staj evrakı, başvuru formu ve akademik belgeleri checklist ile kontrol edip riskli kayıtları manuel kontrole ayırın.",
    href: "/academic",
    meta: "Staj belgeleri · eksik evrak · insan onayı"
  }
];

export default function StartPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">Başlangıç Akışı</p>
          <h1 className="mt-4 text-4xl font-bold tracking-normal sm:text-5xl">Hangi belge akışıyla başlamak istersiniz?</h1>
          <p className="mt-5 text-lg leading-8 text-neutral-300">
            QueueLess AI Inbox iki demo senaryosunu tek tasarım dilinde sunar: işe alım CV analizi ve akademik/staj belge kontrolü.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {flows.map((flow) => (
            <Link
              key={flow.href}
              href={flow.href}
              className="group rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-panel transition hover:border-emerald-300/70 hover:bg-white/[0.07]"
            >
              <p className="text-sm font-semibold text-emerald-300">{flow.meta}</p>
              <h2 className="mt-4 text-2xl font-bold">{flow.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-300">{flow.description}</p>
              <span className="mt-6 inline-flex min-h-11 items-center rounded-md bg-emerald-400 px-4 text-sm font-bold text-neutral-950 transition group-hover:bg-emerald-300">
                Bu Akışla Başla
              </span>
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
