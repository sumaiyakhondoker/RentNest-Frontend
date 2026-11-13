import { SidebarProvider } from "@/components/ui/sidebar";
import TenantSidebar from "./TenantSidebar";

export default function TenantDashboardShell({ children, active }: { children: React.ReactNode; active: "overview" | "requests" | "payments" | "profile" }) {
  return (
    <SidebarProvider>
      <TenantSidebar active={active} />
      {children}
    </SidebarProvider>
  );
}
