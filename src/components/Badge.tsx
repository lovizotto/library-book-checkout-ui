const styles = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  red: "bg-red-50 text-red-700 ring-red-200",
  yellow: "bg-amber-50 text-amber-700 ring-amber-200",
};

export function Badge({ children, variant }: { children: React.ReactNode; variant: keyof typeof styles }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset whitespace-nowrap ${styles[variant]}`}>
      {children}
    </span>
  );
}
