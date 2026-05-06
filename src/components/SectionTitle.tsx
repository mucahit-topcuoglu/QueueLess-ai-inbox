export function SectionTitle({
  eyebrow,
  title,
  description,
  tone = "light"
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-black uppercase tracking-[0.22em] ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-black tracking-normal sm:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h2>
      {description ? <p className={`mt-4 text-base leading-7 ${isDark ? "text-neutral-300" : "text-slate-600"}`}>{description}</p> : null}
    </div>
  );
}
