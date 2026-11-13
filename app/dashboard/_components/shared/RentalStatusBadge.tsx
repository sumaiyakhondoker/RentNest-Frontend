import { Badge } from "@/components/ui/badge";
import type { RentalRequest } from "@/lib/types";

const statusColors: Record<RentalRequest["status"], string> = {
  PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  APPROVED: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  ACTIVE: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  COMPLETED: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
};

export default function RentalStatusBadge({ status }: { status: RentalRequest["status"] }) {
  return (
    <Badge variant="secondary" className={statusColors[status]}>
      {status[0] + status.slice(1).toLowerCase()}
    </Badge>
  );
}
