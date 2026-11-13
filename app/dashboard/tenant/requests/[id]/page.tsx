import { getMe } from "@/service/getMe";
import { getRentalRequestById } from "@/app/dashboard/_actions/tenant/getMyRentalRequests";
import RentalRequestDetails from "@/app/dashboard/_components/tenant/requests/RentalRequestDetails";
import TenantDashboardHeader from "@/app/dashboard/_components/tenant/shared/TenantDashboardHeader";
import TenantDashboardShell from "@/app/dashboard/_components/tenant/shared/TenantDashboardShell";

export default async function RentalRequestDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [user, request] = await Promise.all([
    getMe(),
    getRentalRequestById(id),
  ]);
  const name = user.success ? user.data?.profile?.name || "Tenant" : "Tenant";

  return (
    <TenantDashboardShell active="requests">
      <div className="min-w-0 flex-1">
        <TenantDashboardHeader
          name={name}
          title="Rental request details"
          description="See the status and details of your request"
        />
        <main className="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 lg:px-10">
          {request ? (
            <RentalRequestDetails request={request} />
          ) : (
            <p role="alert" className="rounded-xl border p-6 text-sm text-destructive">
              Rental request not found.
            </p>
          )}
        </main>
      </div>
    </TenantDashboardShell>
  );
}
