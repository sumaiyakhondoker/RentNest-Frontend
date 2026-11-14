import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import DashboardShell from "@/app/dashboard/_components/shared/DashboardShell";
import { adminItems, AdminSidebarFooter } from "@/app/dashboard/_components/admin/AdminSidebar";
import AdminDashboardContent from "@/app/dashboard/_components/admin/overview/AdminDashboardContent";

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      items={adminItems}
      activeHref="/dashboard/admin"
      groupLabel="ADMIN WORKSPACE"
      footer={<AdminSidebarFooter />}
    >
      <Suspense fallback={
        <div className="flex min-h-96 min-w-0 flex-1 items-center justify-center text-primary" role="status">
          <Spinner className="size-[55px]" />
        </div>
      }>
        <AdminDashboardContent />
      </Suspense>
    </DashboardShell>
  );
}
