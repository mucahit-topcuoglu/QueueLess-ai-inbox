import Link from "next/link";

const navItems = [
  { label: "Ana sayfa", href: "/" },
  { label: "Başla", href: "/start" },
  { label: "Dashboard", href: "/dashboard" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-neutral-950/90">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link href="/" className="text-lg font-black tracking-normal text-white">
          QueueLess <span className="text-emerald-300">AI Inbox</span>
        </Link>
        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-neutral-300 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
