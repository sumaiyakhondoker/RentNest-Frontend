import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Payment, Property } from "@/lib/types";

export default function RecentPayment({
  payment,
  property,
  hasError,
}: {
  payment: Payment | null;
  property?: Property;
  hasError: boolean;
}) {
  const money = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);
  const date = (value: string) =>
    new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
      new Date(value),
    );
  return (
    <Card className="gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-xl font-bold">Recent payments</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Payments for approved rental requests.
        </p>
        <div className="mt-6 border-t pt-5">
          {hasError ? (
            <p role="alert" className="text-sm text-destructive">
              Could not load payments. Refresh to try again.
            </p>
          ) : payment ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-primary">
                  <CreditCard className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">
                    {property?.title || "Rental payment"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {date(payment.createdAt)} · {payment.provider}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{money(payment.amount)}</p>
                <Badge
                  variant="secondary"
                  className={
                    payment.status === "COMPLETED"
                      ? "bg-primary/10 text-primary"
                      : payment.status === "FAILED"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted text-foreground"
                  }
                >
                  {payment.status[0] + payment.status.slice(1).toLowerCase()}
                </Badge>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No payments yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
