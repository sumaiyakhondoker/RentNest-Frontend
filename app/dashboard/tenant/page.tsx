import TenantSidebar from "./_components/TenantSidebar";
import TenantDashboardContent from "./_components/TenantDashboardContent";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function TenantDashboardPage() {
  return (
    <SidebarProvider>
      <TenantSidebar />
      <TenantDashboardContent />
    </SidebarProvider>
  );
}
