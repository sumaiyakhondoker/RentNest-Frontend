import DashboardShell from "@/app/dashboard/_components/shared/DashboardShell";
import { tenantItems, TenantSidebarFooter } from "@/app/dashboard/_components/tenant/TenantSidebar";

export default function TenantLayout({ children }: LayoutProps<"/dashboard/tenant">) {
  return (
    <DashboardShell items={tenantItems} groupLabel="YOUR SPACE" footer={<TenantSidebarFooter />} role="TENANT">
      {children}
    </DashboardShell>
  );
}
