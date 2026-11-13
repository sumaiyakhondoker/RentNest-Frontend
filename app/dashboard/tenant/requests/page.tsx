import { getMe } from "@/service/getMe";
import TenantDashboardHeader from "../_components/TenantDashboardHeader";
import TenantDashboardShell from "../_components/TenantDashboardShell";
import MyRentalRequestsList from "../_components/MyRentalRequestsList";

export default async function MyRentalRequestsPage() {
  const user = await getMe();
  const name = user.success ? user.data?.profile?.name || "Tenant" : "Tenant";

  return <TenantDashboardShell active="requests">
    <div className="min-w-0 flex-1">
      <TenantDashboardHeader name={name} title="My rental requests" description="Track your requests and landlord decisions" />
      <main className="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 lg:px-10">
        <div><h2 className="text-2xl font-bold">All requests</h2><p className="mt-1 text-sm text-muted-foreground">See the latest status of each rental request.</p></div>
        <MyRentalRequestsList />
      </main>
    </div>
  </TenantDashboardShell>;
}
