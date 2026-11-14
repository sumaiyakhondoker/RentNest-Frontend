import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import RentalStatusBadge from "@/app/dashboard/_components/shared/RentalStatusBadge";
import type { LandlordRentalRequest, Property } from "@/lib/types";
import RequestActions from "./RequestActions";

export default function PendingRequestCard({
  request,
  property,
}: {
  request: LandlordRentalRequest;
  property?: Property;
}) {
  const tenantName = request.tenant?.name || `Tenant ${request.tenantId.slice(0, 8)}`;
  const initials = tenantName.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const received = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(request.createdAt));
  const rent = property
    ? new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 }).format(property.price)
    : null;

  return (
    <Card className="gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-12 shrink-0">
              <AvatarFallback className="bg-accent text-sm font-bold text-primary">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{tenantName}</h2>
              <p className="mt-1 text-xs text-muted-foreground">Received {received}</p>
            </div>
          </div>
          <RentalStatusBadge status={request.status} />
        </div>

        <Separator className="my-4" />

        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="min-w-0 flex-1 space-y-3">
            <p className="font-semibold">{property?.title || `Property ${request.propertyId.slice(0, 8)}`}</p>
            <p className="text-sm text-muted-foreground">{request.message || "No note from the tenant."}</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            {rent && <p className="text-sm font-semibold">{rent} / month</p>}
            <RequestActions requestId={request.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
