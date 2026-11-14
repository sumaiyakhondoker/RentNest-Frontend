import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

export default function DashboardHeader({
  name,
  profileImage,
  title,
  description,
  accountLabel,
  className = "",
}: {
  name: string;
  profileImage?: string | null;
  title: string;
  description: string;
  accountLabel: string;
  className?: string;
}) {
  const imageUrl = profileImage?.trim();
  const validImage = imageUrl?.startsWith("https://") || imageUrl?.startsWith("http://");

  return (
    <header className={`flex h-22 shrink-0 items-center justify-between gap-4 border-b px-5 py-0 sm:px-8 lg:px-10 ${className}`}>
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden text-[11px] font-semibold text-muted-foreground sm:block">
          {accountLabel}
        </span>
        <Avatar className="size-11" aria-label={name}>
          {validImage && <AvatarImage src={imageUrl} alt={name} />}
          <AvatarFallback className="bg-primary/10 text-primary">
            <UserRound className="size-5" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
