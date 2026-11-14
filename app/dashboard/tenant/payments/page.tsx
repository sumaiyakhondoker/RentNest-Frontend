import { getMe } from "@/service/getMe";
import TenantDashboardHeader from "@/app/dashboard/_components/tenant/shared/TenantDashboardHeader";
import TenantDashboardShell from "@/app/dashboard/_components/tenant/shared/TenantDashboardShell";
import PaymentHistoryList from "@/app/dashboard/_components/tenant/payments/PaymentHistoryList";

export default async function PaymentHistoryPage() {
  const user = await getMe();
  const name = user.success ? user.data?.profile?.name || "Tenant" : "Tenant";

  return (
    <TenantDashboardShell active="payments">
      <div className="min-w-0 flex-1">
        <TenantDashboardHeader
          name={name}
          profileImage={user.success ? user.data?.profile?.profileImage : null}
          title="Payment history"
          description="See your rental payments in one place"
        />
        <main className="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 lg:px-10">
          <PaymentHistoryList />
        </main>
      </div>
    </TenantDashboardShell>
  );
}
