import { Spinner } from "@/components/ui/spinner";

const DashboardLoading = () => {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center text-primary"
      role="status"
      aria-live="polite"
    >
      <Spinner className="size-14" />
    </div>
  );
};

export default DashboardLoading;
