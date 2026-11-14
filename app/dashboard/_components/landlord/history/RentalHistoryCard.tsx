import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RentalStatusBadge from "@/app/dashboard/_components/shared/RentalStatusBadge";
import type { LandlordRentalRequest, Property } from "@/lib/types";

export default function RentalHistoryCard({
  request,
  property,
}: {
  request: LandlordRentalRequest;
  property?: Property;
}) {
  const date = (value: string) =>
    new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(value));
  const rent = property
    ? new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
      }).format(property.price)
    : null;

  return (
    <Card className="gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">
              {property?.title || `Property ${request.propertyId.slice(0, 8)}`}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tenant: {request.tenant?.name || `Tenant ${request.tenantId.slice(0, 8)}`}
            </p>
          </div>
          <RentalStatusBadge status={request.status} />
        </div>

        <Separator className="my-4" />

        <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">Requested</p>
            <p className="mt-1 font-medium">{date(request.createdAt)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Move-in date</p>
            <p className="mt-1 font-medium">{request.moveInDate ? date(request.moveInDate) : "—"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Lease end date</p>
            <p className="mt-1 font-medium">{request.leaseEndDate ? date(request.leaseEndDate) : "—"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Monthly rent</p>
            <p className="mt-1 font-medium">{rent || "—"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
