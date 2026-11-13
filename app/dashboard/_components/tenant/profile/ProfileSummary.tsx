import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { UserProfile } from "@/lib/types";

export default function ProfileSummary({ profile }: { profile: UserProfile }) {
  const initials = profile.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="rounded-xl shadow-none">
      <CardContent className="flex flex-wrap items-center gap-6 p-6 sm:p-7">
        <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-accent text-2xl font-bold text-primary sm:size-22">
          {initials}
        </span>
        <div className="min-w-0">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="mt-2 break-all text-sm text-muted-foreground">
            {profile.email}
          </p>
          <Badge variant="secondary" className="mt-3 capitalize">
            {profile.role.toLowerCase()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
