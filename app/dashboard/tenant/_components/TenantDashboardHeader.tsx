import { SidebarTrigger } from "@/components/ui/sidebar";

export default function TenantDashboardHeader({
  name,
  title = "Tenant dashboard",
  description = "Manage your rentals in one place",
  showSidebarTrigger = true,
  className = "",
}: {
  name: string;
  title?: string;
  description?: string;
  showSidebarTrigger?: boolean;
  className?: string;
}) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <header className={`flex items-center justify-between gap-4 border-b px-5 py-5 sm:px-8 lg:px-10 ${className}`}>
      <div className="flex items-center gap-3">
        {showSidebarTrigger && <SidebarTrigger />}
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden text-[11px] font-semibold text-muted-foreground sm:block">
          TENANT ACCOUNT
        </span>
        <span
          aria-label={name}
          className="flex size-11 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary"
        >
          {initials}
        </span>
      </div>
    </header>
  );
}
