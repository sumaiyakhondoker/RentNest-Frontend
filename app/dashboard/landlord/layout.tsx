import DashboardShell from "@/app/dashboard/_components/shared/DashboardShell";
import { landlordItems, LandlordSidebarFooter } from "@/app/dashboard/_components/landlord/LandlordSidebar";

export default function LandlordLayout({ children }: LayoutProps<"/dashboard/landlord">) {
  return (
    <DashboardShell items={landlordItems} groupLabel="LANDLORD WORKSPACE" footer={<LandlordSidebarFooter />} role="LANDLORD">
      {children}
    </DashboardShell>
  );
}
