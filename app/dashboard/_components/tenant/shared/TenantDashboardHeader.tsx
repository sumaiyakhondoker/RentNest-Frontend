import DashboardHeader from "@/app/dashboard/_components/shared/DashboardHeader";

export default function TenantDashboardHeader({
  name,
  title = "Tenant dashboard",
  description = "Manage your rentals in one place",
  className = "",
}: {
  name: string;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <DashboardHeader
      name={name}
      title={title}
      description={description}
      accountLabel="TENANT ACCOUNT"
      className={className}
    />
  );
}
