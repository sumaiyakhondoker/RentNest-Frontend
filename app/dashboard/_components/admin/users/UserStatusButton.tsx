"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateAdminUserStatus } from "@/app/dashboard/_actions/admin/updateAdminUserStatus";
import type { UserProfile } from "@/lib/types";

export default function UserStatusButton({ user }: { user: UserProfile }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const isBanned = user.accountStatus === "BANNED";

  const changeStatus = () => {
    startTransition(async () => {
      const result = await updateAdminUserStatus(user.id, isBanned ? "ACTIVE" : "BANNED");
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      type="button"
      size="sm"
      variant={isBanned ? "secondary" : "destructive"}
      className="min-w-24 rounded-lg"
      disabled={pending}
      onClick={changeStatus}
      aria-label={`${isBanned ? "Unban" : "Ban"} ${user.name}`}
    >
      {pending ? "Updating..." : isBanned ? "Unban" : "Ban"}
    </Button>
  );
}
