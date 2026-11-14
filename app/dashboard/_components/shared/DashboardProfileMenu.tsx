import { getMe } from "@/service/getMe";
import type { UserProfile } from "@/lib/types";
import DashboardUserMenu from "./DashboardUserMenu";

export default async function DashboardProfileMenu({ role }: { role: UserProfile["role"] }) {
  const result = await getMe();
  const profile = result.success ? result.data?.profile : null;
  const name = profile?.name || role[0] + role.slice(1).toLowerCase();

  return <DashboardUserMenu name={name} profileImage={profile?.profileImage} />;
}
