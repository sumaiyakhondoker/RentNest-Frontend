import Link from "next/link";
import { ArrowRight, Building2, Clock3, LayoutGrid, ListChecks, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export const landlordItems = [
  { label: "Overview", href: "/dashboard/landlord", icon: LayoutGrid },
  { label: "My properties", href: "/dashboard/landlord/properties", icon: Building2 },
  { label: "Rental requests", href: "/dashboard/landlord/requests", icon: ListChecks },
  { label: "Rental history", href: "/dashboard/landlord/history", icon: Clock3 },
  { label: "My profile", href: "/dashboard/landlord/profile", icon: UserRound, disabled: true },
];

export function LandlordSidebarFooter() {
  return (
    <div className="space-y-4 rounded-2xl bg-accent p-4">
      <h2 className="font-semibold">Manage with ease</h2>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Keep rental properties and requests in one place.
      </p>
      <Button asChild className="w-full rounded-lg">
        <Link href="/properties">
          Explore homes <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
