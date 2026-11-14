import { getMyProfile } from "@/app/dashboard/_actions/tenant/getMyProfile";
import ProfileDetails from "@/app/dashboard/_components/tenant/profile/ProfileDetails";
import ProfileSummary from "@/app/dashboard/_components/tenant/profile/ProfileSummary";
import TenantDashboardHeader from "@/app/dashboard/_components/tenant/shared/TenantDashboardHeader";
import TenantDashboardShell from "@/app/dashboard/_components/tenant/shared/TenantDashboardShell";

export default async function MyProfilePage() {
  const result = await getMyProfile();
  const profile = result.success ? result.data?.profile : null;

  return (
    <TenantDashboardShell active="profile">
      <div className="min-w-0 flex-1">
        <TenantDashboardHeader
          name={profile?.name || "Tenant"}
          profileImage={profile?.profileImage}
          title="My profile"
          description="Your RentNest account"
        />
        <main className="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 lg:px-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              ACCOUNT / PROFILE
            </p>
            <h1 className="mt-2 text-3xl font-bold">Your profile</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your personal details and account information in one place.
            </p>
          </div>
          {profile ? (
            <>
              <ProfileSummary profile={profile} />
              <ProfileDetails profile={profile} />
            </>
          ) : (
            <p role="alert" className="rounded-xl border p-6 text-sm text-destructive">
              {result.message}
            </p>
          )}
        </main>
      </div>
    </TenantDashboardShell>
  );
}
