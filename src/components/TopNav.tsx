import { BrandLogo } from "./BrandLogo";
import { PrimaryButton } from "./PrimaryButton";

const navItems = [
  { label: "Ana sayfa", href: "/" },
  { label: "Başla", href: "/start" },
  { label: "Dashboard", href: "/dashboard" }
];

export function TopNav({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const isDark = tone === "dark";

  return (
    <header className={`${isDark ? "border-white/10 bg-neutral-950/95" : "border-slate-200 bg-white/95"} border-b`}>
      <div className="mx-auto flex min-h-16 max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <BrandLogo compact />
        <div className="flex flex-wrap items-center gap-2">
          <nav className="flex flex-wrap gap-1">
            {navItems.map((item) => (
              <PrimaryButton key={item.href} href={item.href} variant={isDark ? "dark" : "secondary"} className="min-h-10 px-3 font-bold">
                {item.label}
              </PrimaryButton>
            ))}
          </nav>
          <PrimaryButton href="/start" className="min-h-10 px-4">
            Başla
          </PrimaryButton>
        </div>
      </div>
    </header>
  );
}
