export function LoadingState() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel">
      <div className="h-5 w-44 animate-pulse rounded bg-slate-200" />
      <div className="mt-5 space-y-3">
        <div className="h-16 animate-pulse rounded bg-slate-100" />
        <div className="h-16 animate-pulse rounded bg-slate-100" />
        <div className="h-16 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  );
}
