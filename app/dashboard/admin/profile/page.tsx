import { Suspense } from "react";
import { Loader } from "lucide-react";
import DashboardShell from "@/app/dashboard/_components/shared/DashboardShell";
import ProfileContent from "@/app/dashboard/_components/shared/profile/ProfileContent";
import { adminItems, AdminSidebarFooter } from "@/app/dashboard/_components/admin/AdminSidebar";

export default function AdminProfilePage() {
  return (
    <DashboardShell
      items={adminItems}
      activeHref="/dashboard/admin/profile"
      groupLabel="ADMIN WORKSPACE"
      footer={<AdminSidebarFooter />}
    >
      <Suspense fallback={
        <div className="flex min-h-96 min-w-0 flex-1 items-center justify-center text-primary" role="status">
          <Loader size={55} className="animate-spin" aria-hidden="true" />
        </div>
      }>
        <ProfileContent role="ADMIN" />
      </Suspense>
    </DashboardShell>
  );
}
