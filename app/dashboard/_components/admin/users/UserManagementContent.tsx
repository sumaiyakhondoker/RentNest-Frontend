import { getMe } from "@/service/getMe";
import { getAdminUsers } from "@/app/dashboard/_actions/admin/getAdminUsers";
import DashboardHeader from "@/app/dashboard/_components/shared/DashboardHeader";
import UserSummary from "./UserSummary";
import UserTable from "./UserTable";

export default async function UserManagementContent() {
  const [profileResult, usersResult] = await Promise.all([getMe(), getAdminUsers()]);
  const profile = profileResult.success ? profileResult.data?.profile : null;
  const users = usersResult.success ? usersResult.data.allUsers : [];

  return (
    <div className="min-w-0 flex-1">
      <DashboardHeader
        name={profile?.name || "Admin"}
        profileImage={profile?.profileImage}
        title="User management"
        description=""
        accountLabel="ADMINISTRATOR"
      />
      <main className="mx-auto max-w-7xl space-y-5 px-5 py-7 sm:px-8 lg:px-10">
        <div>
          <p className="text-xs font-bold tracking-wide text-primary">ACCOUNTS &amp; ACCESS</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Manage platform users</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Search tenant and landlord accounts, review roles and account status.
          </p>
        </div>
        {usersResult.success && <UserSummary users={users} total={usersResult.data.totalUsers} />}
        <UserTable users={users} hasError={!usersResult.success} />
      </main>
    </div>
  );
}
