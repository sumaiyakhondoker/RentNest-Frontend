import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { RentalRequest } from "@/lib/types";
import { createPayment } from "../_actions/createPayment";
import RentalStatusBadge from "./RentalStatusBadge";

export default function RecentRentalRequests({
  rentals,
  hasError,
}: {
  rentals: RentalRequest[];
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
        <h2 className="text-xl font-bold">Recent rental requests</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Track requests and decisions from landlords.
        </p>
        {hasError ? (
          <p role="alert" className="mt-6 text-sm text-destructive">
            Could not load rental requests. Refresh to try again.
          </p>
        ) : rentals.length === 0 ? (
          <p className="mt-6 rounded-lg bg-muted p-6 text-center text-sm text-muted-foreground">
            No rental requests yet. Browse properties to find your next home.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-170 text-left text-sm">
              <thead className="bg-muted text-xs font-bold text-muted-foreground">
                <tr>
                  <th className="rounded-l-lg px-4 py-4">PROPERTY</th>
                  <th className="px-3 py-4">REQUESTED</th>
                  <th className="px-3 py-4">RENT</th>
                  <th className="px-3 py-4">STATUS</th>
                  <th className="rounded-r-lg px-3 py-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((item) => (
                  <tr key={item.id} className="border-b last:border-b-0">
                    <td className="px-4 py-4">
                      <span className="block font-semibold">
                        {item.property?.title || "Property unavailable"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.property?.location || item.propertyId}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-muted-foreground">
                      {date(item.createdAt)}
                    </td>
                    <td className="px-3 py-4 font-semibold">
                      {item.property ? money(item.property.price) : "—"}
                    </td>
                    <td className="px-3 py-4">
                      <RentalStatusBadge status={item.status} />
                    </td>
                    <td className="px-3 py-4">
                      {item.status === "APPROVED" && (
                        <form action={createPayment.bind(null, item.id)}>
                          <Button type="submit" size="sm">Pay Now</Button>
                        </form>
                      )}
                      {item.status === "ACTIVE" && (
                        <Button size="sm" disabled title="Review form is coming soon">
                          Leave Review
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
