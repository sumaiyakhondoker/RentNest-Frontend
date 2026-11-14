"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { UserProfile } from "@/lib/types";

const pageTitles: Record<UserProfile["role"], Record<string, { title: string; description: string }>> = {
  TENANT: {
    "/dashboard/tenant": { title: "Tenant dashboard", description: "Manage your rentals in one place" },
    "/dashboard/tenant/requests": { title: "My rental requests", description: "Track your requests and landlord decisions" },
    "/dashboard/tenant/payments": { title: "Payment history", description: "See your rental payments in one place" },
    "/dashboard/tenant/profile": { title: "My profile", description: "Your RentNest account" },
  },
  LANDLORD: {
    "/dashboard/landlord": { title: "Landlord overview", description: "Manage your rentals in one place" },
    "/dashboard/landlord/properties": { title: "My properties", description: "" },
    "/dashboard/landlord/requests": { title: "Rental requests", description: "" },
    "/dashboard/landlord/history": { title: "Rental history", description: "" },
    "/dashboard/landlord/profile": { title: "My profile", description: "Your RentNest account" },
  },
  ADMIN: {
    "/dashboard/admin": { title: "Admin overview", description: "" },
    "/dashboard/admin/users": { title: "User management", description: "" },
    "/dashboard/admin/properties": { title: "Property moderation", description: "" },
    "/dashboard/admin/categories": { title: "Category management", description: "" },
    "/dashboard/admin/requests": { title: "Rental requests", description: "" },
    "/dashboard/admin/profile": { title: "My profile", description: "Your RentNest account" },
  },
};

export default function DashboardHeader({
  role,
  userMenu,
}: {
  role: UserProfile["role"];
  userMenu: ReactNode;
}) {
  const pathname = usePathname();
  let page = pageTitles[role][pathname];

  if (!page && role === "TENANT" && pathname.startsWith("/dashboard/tenant/requests/")) {
    page = pathname.endsWith("/pay")
      ? { title: "Complete rental payment", description: "Review your approved request before checkout" }
      : { title: "Rental request details", description: "See the status and details of your request" };
  }

  if (!page) {
    page = pageTitles[role][`/dashboard/${role.toLowerCase()}`];
  }
  const accountLabel = role === "ADMIN" ? "ADMINISTRATOR" : `${role} ACCOUNT`;

  return (
    <header className="flex h-22 shrink-0 items-center justify-between gap-4 border-b px-5 py-0 sm:px-8 lg:px-10">
      <div>
        <h1 className="text-xl font-bold">{page.title}</h1>
        {page.description && <p className="text-xs text-muted-foreground">{page.description}</p>}
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden text-[11px] font-semibold text-muted-foreground sm:block">
          {accountLabel}
        </span>
        {userMenu}
      </div>
    </header>
  );
}
