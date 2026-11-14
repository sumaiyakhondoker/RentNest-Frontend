"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/service/logout";

export default function DashboardUserMenu({
  name,
  profileImage,
}: {
  name: string;
  profileImage?: string | null;
}) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const imageUrl = profileImage?.trim();
  const validImage = imageUrl?.startsWith("https://") || imageUrl?.startsWith("http://");

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out successfully!");
      router.replace("/auth/login");
      router.refresh();
    } catch {
      toast.error("Something went wrong while logging out");
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label="Open user menu" className="cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-primary">
          <Avatar className="size-11" aria-label={name}>
            {validImage && <AvatarImage src={imageUrl} alt={name} />}
            <AvatarFallback className="bg-primary/10 text-primary">
              <UserRound className="size-5" />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="truncate">{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isLoggingOut}
          onSelect={() => void handleLogout()}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 size-4" />
          {isLoggingOut ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
