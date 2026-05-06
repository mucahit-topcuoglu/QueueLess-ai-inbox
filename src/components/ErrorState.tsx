export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-900">
      {message}
    </div>
  );
}
