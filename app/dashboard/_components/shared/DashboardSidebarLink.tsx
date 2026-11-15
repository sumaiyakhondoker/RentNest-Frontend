"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const DashboardSidebarLink = ({
  href,
  label,
  icon,
  disabled,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  disabled?: boolean;
}) => {
  const pathname = usePathname();
  const isNestedPage = label !== "Overview" && pathname.startsWith(`${href}/`);
  const isActive = pathname === href || isNestedPage;

  return (
    <SidebarMenuItem>
      {disabled ? (
        <SidebarMenuButton disabled title="Page coming soon">
          {icon} <span>{label}</span>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton asChild isActive={isActive} className={isActive ? "text-primary" : undefined}>
          <Link href={href} aria-current={isActive ? "page" : undefined}>
            {icon} <span>{label}</span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
};

export default DashboardSidebarLink;
