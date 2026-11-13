import Link from "next/link";
import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMyPayments } from "@/app/dashboard/_actions/tenant/getMyPayments";
import { getRentalRequestById } from "@/app/dashboard/_actions/tenant/getMyRentalRequests";

export default async function PaymentHistoryList() {
  const result = await getMyPayments();

  if (!result.success) {
    return (
      <p role="alert" className="rounded-xl border p-6 text-sm text-destructive">
        {result.message}
      </p>
    );
  }

  const payments = [...result.data].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  if (payments.length === 0) {
    return (
      <Card>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">No payments yet.</p>
          <Button asChild variant="outline">
            <Link href="/dashboard/tenant/requests">View rental requests</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const requests = await Promise.all(
    payments.map((payment) => getRentalRequestById(payment.rentalRequestId)),
  );

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
        <h2 className="text-xl font-bold">All payments</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {payments.length} payment{payments.length === 1 ? "" : "s"} found
        </p>
        <div className="mt-6 divide-y border-t">
          {payments.map((payment, index) => (
            <div
              key={payment.id}
              className="flex flex-wrap items-center justify-between gap-4 py-5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                  <CreditCard className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold">
                    {requests[index]?.property?.title || "Rental payment"}
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
                      ? "bg-green-100 text-green-800"
                      : payment.status === "FAILED"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                  }
                >
                  {payment.status[0] + payment.status.slice(1).toLowerCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
