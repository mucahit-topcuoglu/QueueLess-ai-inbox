import Link from "next/link";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <img
        src="/queueless-ai-logo.svg"
        alt="QueueLess AI Inbox"
        className={compact ? "h-10 w-auto" : "h-12 w-auto"}
      />
      <span className="sr-only">QueueLess AI Inbox ana sayfa</span>
    </Link>
  );
}
