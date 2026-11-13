import { Suspense } from "react";
import { Loader } from "lucide-react";
import { getMe } from "@/service/getMe";
import TenantDashboardHeader from "@/app/dashboard/_components/tenant/shared/TenantDashboardHeader";
import TenantDashboardShell from "@/app/dashboard/_components/tenant/shared/TenantDashboardShell";
import MyRentalRequestsList from "@/app/dashboard/_components/tenant/requests/MyRentalRequestsList";

async function MyRentalRequestsContent() {
  const user = await getMe();
  const name = user.success ? user.data?.profile?.name || "Tenant" : "Tenant";

  return (
    <div className="min-w-0 flex-1">
      <TenantDashboardHeader
        name={name}
        title="My rental requests"
        description="Track your requests and landlord decisions"
      />
      <main className="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 lg:px-10">
        <div>
          <h2 className="text-2xl font-bold">All requests</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            See the latest status of each rental request.
          </p>
        </div>
        <MyRentalRequestsList />
      </main>
    </div>
  );
}

export default function MyRentalRequestsPage() {
  return (
    <TenantDashboardShell active="requests">
      <Suspense
        fallback={
          <div className="flex min-h-96 min-w-0 flex-1 items-center justify-center gap-3 text-primary" role="status">
            <Loader size={55} className=" animate-spin"  />
          </div>
        }
      >
        <MyRentalRequestsContent />
      </Suspense>
    </TenantDashboardShell>
  );
}
