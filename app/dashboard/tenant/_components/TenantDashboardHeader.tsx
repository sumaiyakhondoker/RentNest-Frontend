import { SidebarTrigger } from "@/components/ui/sidebar";

export default function TenantDashboardHeader({ name }: { name: string }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return <header className="flex items-center justify-between gap-4 border-b px-5 py-5 sm:px-8 lg:px-10">
    <div className="flex items-center gap-3"><SidebarTrigger /><div><h1 className="text-xl font-bold">Tenant dashboard</h1><p className="text-xs text-muted-foreground">Manage your rentals in one place</p></div></div>
    <div className="flex items-center gap-4"><span className="hidden text-[11px] font-semibold text-muted-foreground sm:block">TENANT ACCOUNT</span><span aria-label={name} className="flex size-11 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary">{initials}</span></div>
  </header>;
}
