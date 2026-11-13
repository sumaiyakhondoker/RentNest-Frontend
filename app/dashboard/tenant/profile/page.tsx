import { getMyProfile } from "../_actions/getMyProfile";
import ProfileDetails from "../_components/ProfileDetails";
import ProfileSummary from "../_components/ProfileSummary";
import TenantDashboardHeader from "../_components/TenantDashboardHeader";
import TenantDashboardShell from "../_components/TenantDashboardShell";

export default async function MyProfilePage() {
  const result = await getMyProfile();
  const profile = result.success ? result.data?.profile : null;

  return (
    <TenantDashboardShell active="profile">
      <div className="min-w-0 flex-1">
        <TenantDashboardHeader
          name={profile?.name || "Tenant"}
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
