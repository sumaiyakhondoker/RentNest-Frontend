import { Banknote, CircleCheck, ListChecks, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { PropertyDetails } from "@/lib/types";

const PropertyOverview = ({ property }: { property: PropertyDetails }) => {
  const details = [
    {
      label: "Monthly rent",
      value: `৳${property.price.toLocaleString("en-BD")}`,
      icon: Banknote,
    },
    {
      label: "Availability",
      value: property.availability === "AVAILABLE" ? "Available" : "Rented",
      icon: CircleCheck,
    },
    {
      label: "Amenities",
      value: property.amenities.length.toString(),
      icon: ListChecks,
    },
    {
      label: "Reviews",
      value: (property.reviews?.length ?? 0).toString(),
      icon: Star,
    },
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-[22px] font-bold">Property overview</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {details.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="h-[100px] rounded-xl py-0 shadow-none">
            <CardContent className="flex h-full flex-col justify-between p-4">
              <div className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-5 shrink-0 text-primary" />
                <span className="truncate text-sm font-semibold">{value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PropertyOverview;
