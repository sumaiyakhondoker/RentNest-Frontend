import { Check, Clock3, CreditCard, ListChecks } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { RentalRequest, Payment } from "@/lib/types";

export default function TenantMetrics({
  rentals,
  payments,
}: {
  rentals: RentalRequest[] | null;
  payments: Payment[] | null;
}) {
  const metrics = [
    {
      label: "Total requests",
      value: rentals?.length,
      detail: "Requests submitted",
      icon: ListChecks,
    },
    {
      label: "Pending approval",
      value: rentals?.filter((item) => item.status === "PENDING").length,
      detail: "Awaiting landlord review",
      icon: Clock3,
    },
    {
      label: "Approved requests",
      value: rentals?.filter((item) => item.status === "APPROVED").length,
      detail: "Approved by landlord",
      icon: Check,
    },
    {
      label: "Payments made",
      value: payments?.filter((item) => item.status === "COMPLETED").length,
      detail: "Completed payments",
      icon: CreditCard,
    },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ label, value, detail, icon: Icon }) => (
        <Card key={label} className="gap-0 rounded-xl py-0 shadow-none">
          <CardContent className="p-5">
            <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-primary">
              <Icon className="size-5" />
            </span>
            <p className="mt-4 text-sm text-muted-foreground">{label}</p>
            <div className="mt-1 flex items-end gap-3">
              <strong className="text-3xl leading-none">
                {value === undefined ? "—" : String(value).padStart(2, "0")}
              </strong>
              <span className="pb-1 text-xs text-muted-foreground">
                {detail}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
