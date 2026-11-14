import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import type { UserProfile } from "@/lib/types";

export default function ProfileSummary({ profile }: { profile: UserProfile }) {
  const imageUrl = profile.profileImage?.trim();
  const validImage = imageUrl?.startsWith("https://") || imageUrl?.startsWith("http://");

  return (
    <Card className="rounded-xl shadow-none">
      <CardContent className="flex flex-wrap items-center gap-6 p-6 sm:p-7">
        <Avatar className="size-20 sm:size-22" aria-label={profile.name}>
          {validImage && <AvatarImage src={imageUrl} alt={profile.name} />}
          <AvatarFallback className="bg-primary/10 text-primary">
            <UserRound className="size-9" />
          </AvatarFallback>
        </Avatar>
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
