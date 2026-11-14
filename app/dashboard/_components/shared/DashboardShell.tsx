import { Suspense, type ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { UserRound } from "lucide-react";
import DashboardSidebar, { type DashboardMenuItem } from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardProfileMenu from "./DashboardProfileMenu";
import type { UserProfile } from "@/lib/types";

export default function DashboardShell({
  children,
  items,
  groupLabel,
  footer,
  role,
}: {
  children: ReactNode;
  items: DashboardMenuItem[];
  groupLabel: string;
  footer?: ReactNode;
  role: UserProfile["role"];
}) {
  return (
    <SidebarProvider className="flex-col md:flex-row">
      <DashboardSidebar
        items={items}
        groupLabel={groupLabel}
        footer={footer}
      />
      <div className="min-w-0 flex-1">
        <DashboardHeader
          role={role}
          userMenu={
            <Suspense fallback={
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserRound className="size-5" aria-hidden="true" />
              </div>
            }>
              <DashboardProfileMenu role={role} />
            </Suspense>
          }
        />
        <Suspense fallback={
          <div className="flex min-h-96 items-center justify-center text-primary" role="status">
            <Spinner className="size-[55px]" />
          </div>
        }>
          {children}
        </Suspense>
      </div>
    </SidebarProvider>
  );
}
