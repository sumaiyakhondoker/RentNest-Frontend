import { Building2, Check, Clock3, House } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { LandlordRentalRequest, Property } from "@/lib/types";

export default function LandlordMetrics({
  properties,
  requests,
}: {
  properties: Property[] | null;
  requests: LandlordRentalRequest[] | null;
}) {
  const metrics = [
    {
      label: "Total properties",
      value: properties?.length,
      detail: "Published listings",
      icon: House,
    },
    {
      label: "Available listings",
      value: properties?.filter((property) => property.availability === "AVAILABLE").length,
      detail: "Currently available",
      icon: Building2,
    },
    {
      label: "Pending requests",
      value: requests?.filter((request) => request.status === "PENDING").length,
      detail: "Awaiting decisions",
      icon: Clock3,
    },
    {
      label: "Approved requests",
      value: requests?.filter((request) => request.status === "APPROVED").length,
      detail: "Accepted requests",
      icon: Check,
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
              <span className="pb-1 text-xs text-muted-foreground">{detail}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
