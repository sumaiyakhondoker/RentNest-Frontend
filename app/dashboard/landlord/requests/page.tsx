import { Suspense } from "react";
import { Loader } from "lucide-react";
import DashboardShell from "@/app/dashboard/_components/shared/DashboardShell";
import { landlordItems, LandlordSidebarFooter } from "@/app/dashboard/_components/landlord/LandlordSidebar";
import LandlordRequestsContent from "@/app/dashboard/_components/landlord/requests/LandlordRequestsContent";

export default function LandlordRequestsPage() {
  return (
    <DashboardShell
      items={landlordItems}
      activeHref="/dashboard/landlord/requests"
      groupLabel="LANDLORD WORKSPACE"
      footer={<LandlordSidebarFooter />}
    >
      <Suspense fallback={
        <div className="flex min-h-96 min-w-0 flex-1 items-center justify-center gap-3 text-primary" role="status">
          <Loader size={55} className="animate-spin" aria-hidden="true" />
        </div>
      }>
        <LandlordRequestsContent />
      </Suspense>
    </DashboardShell>
  );
}
