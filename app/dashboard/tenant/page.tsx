import TenantDashboardContent from "@/app/dashboard/_components/tenant/overview/TenantDashboardContent";
import TenantDashboardShell from "@/app/dashboard/_components/tenant/shared/TenantDashboardShell";

export default function TenantDashboardPage() {
  return (
    <TenantDashboardShell active="overview">
      <TenantDashboardContent />
    </TenantDashboardShell>
  );
}
