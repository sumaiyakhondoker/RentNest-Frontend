import { Building2, ListChecks, Tags, UsersRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminMetrics({
  users,
  properties,
  rentals,
  categories,
}: {
  users: number | null;
  properties: number | null;
  rentals: number | null;
  categories: number | null;
}) {
  const metrics = [
    { label: "Total users", value: users, detail: "Tenant & landlord accounts", icon: UsersRound },
    { label: "Total properties", value: properties, detail: "Published platform listings", icon: Building2 },
    { label: "Rental requests", value: rentals, detail: "Submitted applications", icon: ListChecks },
    { label: "Categories", value: categories, detail: "Property types", icon: Tags },
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
                {value === null ? "—" : String(value).padStart(2, "0")}
              </strong>
              <span className="pb-1 text-xs text-muted-foreground">{detail}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
