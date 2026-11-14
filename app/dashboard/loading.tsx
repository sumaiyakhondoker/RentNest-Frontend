import { Spinner } from "@/components/ui/spinner";

export default function DashboardLoading() {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center text-primary"
      role="status"
      aria-live="polite"
    >
      <Spinner className="size-[55px]" />
    </div>
  );
}
