import Link from "next/link";
import { ArrowRight, CreditCard, LayoutGrid, ListChecks, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export const tenantItems = [
  { label: "Overview", href: "/dashboard/tenant", icon: LayoutGrid },
  { label: "My rental requests", href: "/dashboard/tenant/requests", icon: ListChecks },
  { label: "Payment history", href: "/dashboard/tenant/payments", icon: CreditCard },
  { label: "My profile", href: "/dashboard/tenant/profile", icon: UserRound },
];

export function TenantSidebarFooter() {
  return (
    <div className="space-y-4 rounded-2xl bg-accent p-4">
      <h2 className="font-semibold">Need a new place?</h2>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Discover rentals matched to your next move.
      </p>
      <Button asChild className="w-full rounded-lg">
        <Link href="/properties">
          Explore homes <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
