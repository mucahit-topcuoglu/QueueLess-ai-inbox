export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 text-sm text-neutral-300 md:grid-cols-3">
        <div>
          <p className="font-black text-white">QueueLess AI Inbox</p>
          <p className="mt-2 leading-6">AI destekli belge ve başvuru yönetim platformu MVP’si.</p>
        </div>
        <p className="leading-6">Demo amacı: manuel belge kontrolünü, eksik evrak tespitini ve insan onaylı taslak akışını göstermek.</p>
        <p className="leading-6">Takım: Kişi A dokümantasyon, Kişi B frontend, Kişi C AI workflow ve QA.</p>
      </div>
    </footer>
  );
}
