import DashboardShell from "@/app/dashboard/_components/shared/DashboardShell";
import { adminItems, AdminSidebarFooter } from "@/app/dashboard/_components/admin/AdminSidebar";

export default function AdminLayout({ children }: LayoutProps<"/dashboard/admin">) {
  return (
    <DashboardShell items={adminItems} groupLabel="ADMIN WORKSPACE" footer={<AdminSidebarFooter />} role="ADMIN">
      {children}
    </DashboardShell>
  );
}
