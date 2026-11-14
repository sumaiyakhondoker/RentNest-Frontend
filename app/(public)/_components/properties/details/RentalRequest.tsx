
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PropertyDetails } from "@/lib/types";

type Props = {
  property: PropertyDetails;
};

const RentalRequest=({
  property,
}: Props) =>{
  const available = property.availability === "AVAILABLE";

  const price = `৳ ${property.price.toLocaleString("en-BD")}`;

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-t-[5px] border-t-primary py-0 shadow-none">
      <CardHeader className="px-6 py-6">
        <div className="flex items-baseline gap-2">
          <span className="text-[30px] font-bold">
            {price}
          </span>

          <span className="text-sm text-muted-foreground">
            / month
          </span>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-6 px-6 py-6">
        <h3 className="text-xs font-semibold uppercase text-muted-foreground">
          Rental Details
        </h3>

        <div className="space-y-6 text-sm">
          <div className="flex justify-between gap-3">
            <span className="text-muted-foreground">
              Location
            </span>

            <span className="max-w-44 text-right font-semibold">
              {property.location}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Availability
            </span>

            <span
              className={
                available
                  ? "font-semibold text-primary"
                  : "font-semibold text-muted-foreground"
              }
            >
              {available ? "Available" : "Rented"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Monthly rent
            </span>

            <span className="font-semibold">
              {price}
            </span>
          </div>
        </div>

        <Separator />

        <p className="text-[13px] leading-6 text-muted-foreground">
          Send a rental request to the landlord.
          <br />
          You&apos;ll pay only after approval.
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 px-6 pb-6">
        {available ? (
          <Button
            asChild
            size="lg"
            className="h-[53px] w-full rounded-[10px]"
          >
            <Link href={`/properties/${property.id}/request`}>
              Request to rent <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        ) : (
          <Button
            size="lg"
            disabled
            className="h-[53px] w-full rounded-[10px]"
          >
            Currently unavailable
          </Button>
        )}

        <p className="text-center text-xs text-muted-foreground">
          No payment required to submit a request.
        </p>
      </CardFooter>
    </Card>
  );
}

export default RentalRequest
