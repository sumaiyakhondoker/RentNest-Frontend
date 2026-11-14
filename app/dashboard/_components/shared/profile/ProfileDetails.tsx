import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { UserProfile } from "@/lib/types";

export default function ProfileDetails({ profile }: { profile: UserProfile }) {
  const joined = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(profile.createdAt));

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
      <Card className="rounded-xl shadow-none">
        <CardContent className="space-y-7 p-6">
          <div>
            <h2 className="text-xl font-bold">Personal information</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Details associated with your account.
            </p>
          </div>
          <dl className="grid sm:grid-cols-2">
            <div className="border-t py-5 sm:pr-5">
              <dt className="text-sm text-muted-foreground">Full name</dt>
              <dd className="mt-2 font-semibold">{profile.name}</dd>
            </div>
            <div className="border-t py-5 sm:pl-5">
              <dt className="text-sm text-muted-foreground">Email address</dt>
              <dd className="mt-2 break-all font-semibold">{profile.email}</dd>
            </div>
            <div className="border-t py-5 sm:col-span-2">
              <dt className="text-sm text-muted-foreground">Phone number</dt>
              <dd className="mt-2 font-semibold">{profile.phone || "Not provided"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      <Card className="h-fit rounded-xl shadow-none">
        <CardContent className="space-y-6 p-6">
          <div>
            <h2 className="text-xl font-bold">Account details</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your RentNest account information.
            </p>
          </div>
          <div className="space-y-4 border-t pt-5 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Role</span>
              <span className="font-medium capitalize">{profile.role.toLowerCase()}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="secondary" className={profile.accountStatus === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {profile.accountStatus[0] + profile.accountStatus.slice(1).toLowerCase()}
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Joined</span>
              <span className="font-medium">{joined}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
