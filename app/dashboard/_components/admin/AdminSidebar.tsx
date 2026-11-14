import { Building2, LayoutGrid, ListChecks, Tags, UserRound, UsersRound } from "lucide-react";

export const adminItems = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutGrid },
  { label: "Users", href: "/dashboard/admin/users", icon: UsersRound, disabled: true },
  { label: "Properties", href: "/dashboard/admin/properties", icon: Building2, disabled: true },
  { label: "Categories", href: "/dashboard/admin/categories", icon: Tags, disabled: true },
  { label: "Rental requests", href: "/dashboard/admin/requests", icon: ListChecks, disabled: true },
  { label: "My profile", href: "/dashboard/admin/profile", icon: UserRound },
];

export function AdminSidebarFooter() {
  return (
    <div className="space-y-4 rounded-2xl border bg-accent p-4">
      <h2 className="font-semibold">Platform control</h2>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Manage users, properties and categories in one workspace.
      </p>
    </div>
  );
}
