import DashboardHeader from "@/app/dashboard/_components/shared/DashboardHeader";

export default function TenantDashboardHeader({
  name,
  profileImage,
  title = "Tenant dashboard",
  description = "Manage your rentals in one place",
  className = "",
}: {
  name: string;
  profileImage?: string | null;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <DashboardHeader
      name={name}
      profileImage={profileImage}
      title={title}
      description={description}
      accountLabel="TENANT ACCOUNT"
      className={className}
    />
  );
}
