import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import DashboardShell from "@/app/dashboard/_components/shared/DashboardShell";
import { landlordItems, LandlordSidebarFooter } from "@/app/dashboard/_components/landlord/LandlordSidebar";
import MyPropertiesContent from "@/app/dashboard/_components/landlord/properties/MyPropertiesContent";

export default function MyPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; create?: string }>;
}) {
  return (
    <DashboardShell
      items={landlordItems}
      activeHref="/dashboard/landlord/properties"
      groupLabel="LANDLORD WORKSPACE"
      footer={<LandlordSidebarFooter />}
    >
      <Suspense
        fallback={
          <div className="flex min-h-96 min-w-0 flex-1 items-center justify-center gap-3 text-primary" role="status">
          <Spinner className="size-[55px]" />
          </div>
        }
      >
        <MyPropertiesContent searchParams={searchParams} />
      </Suspense>
    </DashboardShell>
  );
}
