import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LandlordRentalRequest, Property } from "@/lib/types";
import RentalStatusBadge from "@/app/dashboard/_components/shared/RentalStatusBadge";

export default function IncomingLandlordRequests({
  requests,
  properties,
  hasError,
}: {
  requests: LandlordRentalRequest[];
  properties: Property[];
  hasError: boolean;
}) {
  const propertyNames = new Map(properties.map((property) => [property.id, property.title]));
  const date = (value: string) =>
    new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(value));

  return (
    <Card className="gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">Incoming rental requests</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Recently submitted applications from tenants.
            </p>
          </div>
          <Link
            href="/dashboard/landlord/requests"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all requests <ArrowRight className="size-4" />
          </Link>
        </div>

        {hasError ? (
          <p role="alert" className="mt-6 text-sm text-destructive">
            Could not load rental requests. Refresh to try again.
          </p>
        ) : requests.length === 0 ? (
          <p className="mt-6 rounded-lg bg-muted p-6 text-center text-sm text-muted-foreground">
            No rental requests yet.
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-160 text-left text-sm">
              <thead className="bg-muted text-xs font-bold text-muted-foreground">
                <tr>
                  <th className="rounded-l-lg px-4 py-3">TENANT</th>
                  <th className="px-3 py-3">PROPERTY</th>
                  <th className="px-3 py-3">REQUESTED</th>
                  <th className="rounded-r-lg px-3 py-3">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-b last:border-b-0">
                    <td className="px-4 py-4 font-semibold" title={request.tenant?.name || request.tenantId}>
                      {request.tenant?.name || `Tenant ${request.tenantId.slice(0, 8)}`}
                    </td>
                    <td className="px-3 py-4 text-muted-foreground">
                      {propertyNames.get(request.propertyId) || "Property unavailable"}
                    </td>
                    <td className="px-3 py-4 text-muted-foreground">{date(request.createdAt)}</td>
                    <td className="px-3 py-4">
                      <RentalStatusBadge status={request.status} />
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
