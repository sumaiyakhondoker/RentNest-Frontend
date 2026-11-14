"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateLandlordRequestStatus } from "@/app/dashboard/_actions/landlord/updateLandlordRequestStatus";

export default function RequestActions({ requestId }: { requestId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const changeStatus = (status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      const result = await updateLandlordRequestStatus(requestId, status);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button disabled={pending} onClick={() => changeStatus("APPROVED")} className="h-11 rounded-lg px-5">
        Approve
      </Button>
      <Button disabled={pending} onClick={() => changeStatus("REJECTED")} variant="secondary" className="h-11 rounded-lg px-5">
        Reject
      </Button>
    </div>
  );
}
