const STATUS_LABEL: Record<"open" | "won" | "lost", string> = {
  open: "Abierta",
  won: "Ganada",
  lost: "Perdida",
};

export function OpportunityStatusBadge({
  status,
}: {
  status: "open" | "won" | "lost";
}) {
  const color =
    status === "open"
      ? "bg-blue-600"
      : status === "won"
        ? "bg-green-600"
        : "bg-red-600";

  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium text-white ${color}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
