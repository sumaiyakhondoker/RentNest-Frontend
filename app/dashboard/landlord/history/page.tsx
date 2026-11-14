import { Suspense } from "react";
import { Loader } from "lucide-react";
import DashboardShell from "@/app/dashboard/_components/shared/DashboardShell";
import { landlordItems, LandlordSidebarFooter } from "@/app/dashboard/_components/landlord/LandlordSidebar";
import LandlordHistoryContent from "@/app/dashboard/_components/landlord/history/LandlordHistoryContent";

export default function LandlordHistoryPage() {
  return (
    <DashboardShell
      items={landlordItems}
      activeHref="/dashboard/landlord/history"
      groupLabel="LANDLORD WORKSPACE"
      footer={<LandlordSidebarFooter />}
    >
      <Suspense fallback={
        <div className="flex min-h-96 min-w-0 flex-1 items-center justify-center text-primary" role="status">
          <Loader size={55} className="animate-spin" aria-hidden="true" />
        </div>
      }>
        <LandlordHistoryContent />
      </Suspense>
    </DashboardShell>
  );
}
