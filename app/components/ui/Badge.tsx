export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium">
      {children}
    </span>
  );
}
