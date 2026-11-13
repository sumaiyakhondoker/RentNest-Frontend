import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar, { type DashboardMenuItem } from "./DashboardSidebar";

export default function DashboardShell({
  children,
  items,
  activeHref,
  groupLabel,
  footer,
}: {
  children: ReactNode;
  items: DashboardMenuItem[];
  activeHref: string;
  groupLabel: string;
  footer?: ReactNode;
}) {
  return (
    <SidebarProvider className="flex-col md:flex-row">
      <DashboardSidebar
        items={items}
        activeHref={activeHref}
        groupLabel={groupLabel}
        footer={footer}
      />
      {children}
    </SidebarProvider>
  );
}
