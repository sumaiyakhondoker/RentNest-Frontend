import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import ProfileContent from "@/app/dashboard/_components/shared/profile/ProfileContent";
import TenantDashboardShell from "@/app/dashboard/_components/tenant/shared/TenantDashboardShell";

export default function MyProfilePage() {
  return (
    <TenantDashboardShell active="profile">
      <Suspense fallback={
        <div className="flex min-h-96 min-w-0 flex-1 items-center justify-center text-primary" role="status">
          <Spinner className="size-[55px]" />
        </div>
      }>
        <ProfileContent role="TENANT" />
      </Suspense>
    </TenantDashboardShell>
  );
}
