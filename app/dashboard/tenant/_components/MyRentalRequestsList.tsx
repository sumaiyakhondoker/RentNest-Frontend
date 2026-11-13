import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getMyRentalRequests,
  getRentalRequestById,
} from "../_actions/getMyRentalRequests";
import { createPayment } from "../_actions/createPayment";
import RentalStatusBadge from "./RentalStatusBadge";

function formatDate(value?: string | null) {
  return value
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(value),
      )
    : "—";
}

export default async function MyRentalRequestsList() {
  const result = await getMyRentalRequests();
  if (!result.success) {
    return (
      <p
        role="alert"
        className="rounded-xl border p-6 text-sm text-destructive"
      >
        {result.message}
      </p>
    );
  }

  const requests = [...result.data.allRentalRequests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            You haven&apos;t sent any rental requests yet.
          </p>
          <Button asChild>
            <Link href="/properties">
              Browse properties <ArrowRight />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const details = await Promise.all(
    requests.map(async (request) => {
      return (await getRentalRequestById(request.id)) || request;
    }),
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {result.data.totalRentalRequests} total requests
      </p>
      {details.map((request) => (
        <Card key={request.id} className="gap-0 rounded-xl py-0 shadow-none">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">
                  {request.property?.title || "Rental request"}
                </h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {request.property?.location || "Property details unavailable"}
                </p>
              </div>
              <RentalStatusBadge status={request.status} />
            </div>
            <div className="grid gap-3 border-t pt-4 text-sm sm:grid-cols-3">
              <p>
                <span className="block text-xs text-muted-foreground">
                  Requested
                </span>
                {formatDate(request.createdAt)}
              </p>
              <p>
                <span className="block text-xs text-muted-foreground">
                  Move-in
                </span>
                {formatDate(request.moveInDate)}
              </p>
              <p>
                <span className="block text-xs text-muted-foreground">
                  Lease ends
                </span>
                {formatDate(request.leaseEndDate)}
              </p>
            </div>
            {request.message && (
              <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                {request.message}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarDays className="size-4" /> Request ID: {request.id}
              </p>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/properties/${request.propertyId}`}>
                    View property <ArrowRight />
                  </Link>
                </Button>
                {request.status === "APPROVED" && (
                  <form action={createPayment.bind(null, request.id)}>
                    <Button type="submit" size="sm">Pay Now</Button>
                  </form>
                )}
                {request.status === "ACTIVE" && (
                  <Button size="sm" disabled title="Review form is coming soon">
                    Leave Review
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
