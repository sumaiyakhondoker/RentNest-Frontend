import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export type DashboardMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
};

export default function DashboardSidebar({
  items,
  activeHref,
  groupLabel,
  footer,
}: {
  items: DashboardMenuItem[];
  activeHref: string;
  groupLabel: string;
  footer?: ReactNode;
}) {
  return (
    <Sidebar
      collapsible="none"
      className="h-auto w-full shrink-0 border-b md:sticky md:top-0 md:h-svh md:w-(--sidebar-width) md:border-b-0 md:border-r"
    >
      <SidebarHeader className="h-22 justify-center border-b border-sidebar-border px-4 py-0">
        <Link href="/" className="flex items-center">
          <Image src="/rentnest-logo.png" width={70} height={70} alt="RentNest logo" />
          <span className="text-2xl font-bold tracking-tight text-foreground">
            Rent<span className="text-primary">Nest</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeHref === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    {item.disabled ? (
                      <SidebarMenuButton disabled title="Page coming soon">
                        <Icon /> <span>{item.label}</span>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={isActive ? "text-primary" : undefined}
                      >
                        <Link href={item.href} aria-current={isActive ? "page" : undefined}>
                          <Icon /> <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {footer && <SidebarFooter className="p-4">{footer}</SidebarFooter>}
    </Sidebar>
  );
}
