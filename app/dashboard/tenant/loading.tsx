import { Loader } from "lucide-react";

export default function TenantDashboardLoading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-3 text-primary" role="status" aria-live="polite">
      <Loader size={55} className="animate-spin" aria-hidden="true" />
    
    </div>
  );
}