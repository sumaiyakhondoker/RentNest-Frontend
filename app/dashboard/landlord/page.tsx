import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Clock3, LayoutGrid, ListChecks, Loader, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardShell from "@/app/dashboard/_components/shared/DashboardShell";
import LandlordDashboardContent from "@/app/dashboard/_components/landlord/overview/LandlordDashboardContent";

const landlordItems = [
  { label: "Overview", href: "/dashboard/landlord", icon: LayoutGrid },
  { label: "My properties", href: "/dashboard/landlord/properties", icon: Building2, disabled: true },
  { label: "Rental requests", href: "/dashboard/landlord/requests", icon: ListChecks, disabled: true },
  { label: "Rental history", href: "/dashboard/landlord/history", icon: Clock3, disabled: true },
  { label: "My profile", href: "/dashboard/landlord/profile", icon: UserRound, disabled: true },
];

export default function LandlordDashboardPage() {
  return (
    <DashboardShell
      items={landlordItems}
      activeHref="/dashboard/landlord"
      groupLabel="LANDLORD WORKSPACE"
      footer={
        <>
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
        </>
      }
    >
      <Suspense
        fallback={
          <div className="flex min-h-96 min-w-0 flex-1 items-center justify-center gap-3 text-primary" role="status">
            <Loader className="size-6 animate-spin" aria-hidden="true" />
            <span>Loading landlord dashboard...</span>
          </div>
        }
      >
        <LandlordDashboardContent />
      </Suspense>
    </DashboardShell>
  );
}
