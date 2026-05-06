import type { ProductQueue } from "@/types/application";
import { queueLabel } from "@/lib/uiLabels";

export type QueueFilter = ProductQueue | "Tümü";

export function QueueTabs({
  queues,
  activeQueue,
  counts,
  onChange
}: {
  queues: readonly ProductQueue[];
  activeQueue: QueueFilter;
  counts: Record<string, number>;
  onChange: (queue: QueueFilter) => void;
}) {
  const options: QueueFilter[] = ["Tümü", ...queues];

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-panel">
        {options.map((queue) => {
          const isActive = activeQueue === queue;
          const count = queue === "Tümü" ? counts.all : counts[queue] ?? 0;

          return (
            <button
              key={queue}
              type="button"
              onClick={() => onChange(queue)}
              className={`min-h-10 rounded-md px-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              {queue === "Tümü" ? "Tümü" : queueLabel(queue)}
              <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${isActive ? "bg-white/15" : "bg-slate-100"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
