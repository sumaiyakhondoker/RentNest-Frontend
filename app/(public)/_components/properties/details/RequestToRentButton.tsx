"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const RequestToRentButton = ({
  propertyId,
  isLoggedIn,
}: {
  propertyId: string;
  isLoggedIn: boolean;
}) => {
  if (!isLoggedIn) {
    return (
      <Button
        size="lg"
        className="h-[53px] w-full rounded-[10px]"
        onClick={() => toast.error("Please log in, then return here to request this property.")}
      >
        Request to rent <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Button asChild size="lg" className="h-[53px] w-full rounded-[10px]">
      <Link href={`/properties/${propertyId}/request`}>
        Request to rent <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </Button>
  );
};

export default RequestToRentButton;
