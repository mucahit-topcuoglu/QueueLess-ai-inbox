"use client";

export function HumanApprovalNotice({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";

  return (
    <section className={isDark ? "bg-neutral-950 px-4 py-10 text-white sm:px-6 lg:px-8" : "bg-white px-4 py-10 text-neutral-950 sm:px-6 lg:px-8"}>
      <div className={`mx-auto max-w-7xl rounded-lg border p-5 ${isDark ? "border-emerald-300/30 bg-emerald-300/10" : "border-emerald-200 bg-emerald-50"}`}>
        <p className={`text-sm font-black uppercase tracking-[0.2em] ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>Human-in-the-loop</p>
        <p className={`mt-3 text-lg font-bold leading-7 ${isDark ? "text-white" : "text-neutral-950"}`}>
          AI analiz eder, insan onaylar. Sistem otomatik kritik karar vermez; güvenli ve denetlenebilir bir süreç sunar.
        </p>
      </div>
    </section>
  );
}
