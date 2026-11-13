import TenantDashboardContent from "./_components/TenantDashboardContent";
import TenantDashboardShell from "./_components/TenantDashboardShell";

export default function TenantDashboardPage() {
  return (
    <TenantDashboardShell active="overview">
      <TenantDashboardContent />
    </TenantDashboardShell>
  );
}
