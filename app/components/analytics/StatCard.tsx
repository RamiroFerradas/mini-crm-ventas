export function StatCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div
      className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
      aria-label={`${label}: ${value}`}
    >
      <div aria-hidden="true" className="text-sm text-zinc-400">
        {label}
      </div>
      <div aria-hidden="true" className="mt-1 text-2xl font-semibold text-zinc-100">
        {value}
      </div>
    </div>
  );
}
