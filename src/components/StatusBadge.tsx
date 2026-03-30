import { Badge } from "./Badge";

interface StatusBadgeProps {
  available: boolean;
  overdue: boolean;
}

export function StatusBadge({ available, overdue }: StatusBadgeProps) {
  const variant = available ? "green" : overdue ? "red" : "yellow";
  const label = available ? "Available" : overdue ? "Overdue" : "Checked out";
  return <Badge variant={variant}>{label}</Badge>;
}
