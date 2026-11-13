import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { RentalRequest } from "@/lib/types";
import RentalStatusBadge from "./RentalStatusBadge";

function formatDate(value?: string | null) {
  return value
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(value),
      )
    : "—";
}

export default function RentalRequestDetails({ request }: { request: RentalRequest }) {
  const rent = request.property
    ? new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
      }).format(request.property.price)
    : "—";

  return (
    <Card className="rounded-xl shadow-none">
      <CardContent className="space-y-6 p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {request.property?.title || "Rental request"}
            </h2>
            <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {request.property?.location || "Property details unavailable"}
            </p>
          </div>
          <RentalStatusBadge status={request.status} />
        </div>

        <dl className="grid gap-5 border-t pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Requested on</dt>
            <dd className="mt-1 font-semibold">{formatDate(request.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Monthly rent</dt>
            <dd className="mt-1 font-semibold">{rent}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Move-in date</dt>
            <dd className="mt-1 font-semibold">{formatDate(request.moveInDate)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Lease ends</dt>
            <dd className="mt-1 font-semibold">{formatDate(request.leaseEndDate)}</dd>
          </div>
        </dl>

        {request.message && (
          <div className="border-t pt-6">
            <h3 className="text-sm font-semibold">Your message</h3>
            <p className="mt-2 rounded-lg bg-muted p-4 text-sm">
              {request.message}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3 border-t pt-6">
          <Button asChild variant="outline">
            <Link href="/dashboard/tenant/requests">Back to all requests</Link>
          </Button>
          {request.property && (
            <Button asChild>
              <Link href={`/properties/${request.propertyId}`}>
                View property <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
          {request.status === "APPROVED" && (
            <Button asChild>
              <Link href={`/dashboard/tenant/requests/${request.id}/pay`}>
                Pay Now
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
