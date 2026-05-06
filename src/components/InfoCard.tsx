export function InfoCard({
  eyebrow,
  title,
  description,
  tone = "light",
  children
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  children?: React.ReactNode;
}) {
  const isDark = tone === "dark";

  return (
    <article className={`rounded-lg border p-5 shadow-panel ${isDark ? "border-white/10 bg-white/[0.04] text-white" : "border-slate-200 bg-white text-slate-950"}`}>
      {eyebrow ? (
        <p className={`text-xs font-black uppercase tracking-[0.18em] ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>{eyebrow}</p>
      ) : null}
      <h3 className="mt-2 text-lg font-black tracking-normal">{title}</h3>
      {description ? (
        <p className={`mt-2 text-sm leading-6 ${isDark ? "text-neutral-300" : "text-slate-600"}`}>{description}</p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </article>
  );
}
