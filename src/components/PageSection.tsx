export function PageSection({
  children,
  tone = "light",
  className = ""
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <section className={`${tone === "dark" ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-950"} px-4 py-14 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
