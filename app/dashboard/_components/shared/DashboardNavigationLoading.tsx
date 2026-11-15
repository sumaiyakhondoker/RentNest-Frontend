import { Spinner } from "@/components/ui/spinner";

const DashboardNavigationLoading = () => {
  return (
    <div className="flex min-h-96 w-full items-center justify-center text-primary" role="status" aria-live="polite">
      <Spinner className="size-[55px]" />
    </div>
  );
};

export default DashboardNavigationLoading;
