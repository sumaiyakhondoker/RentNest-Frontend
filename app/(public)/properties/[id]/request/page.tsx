
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";

import { getPropertyDetails } from "@/app/(public)/_actions/getPropertyDetails";
import RentalRequestForm from "@/app/(public)/_components/properties/request/RentalRequestForm";
import PropertySummaryCard from "@/app/(public)/_components/properties/request/PropertySummaryCard";

export default async function RequestPage({
  params,
}: PageProps<"/properties/[id]/request">) {
  const { id } = await params;

  const result = await getPropertyDetails(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const property = result.data;

  if (property.availability !== "AVAILABLE") {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-2xl font-bold">
          Property unavailable
        </h1>

        <p className="mt-3 text-muted-foreground">
          This property is currently not available for rent.
        </p>

        <Link
          href={`/properties/${id}`}
          className="mt-5 inline-block text-primary hover:underline"
        >
          Back to property
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-5">
          <Link
            href={`/properties/${id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to Property
          </Link>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Request to Rent
            </h1>

            <p className="text-muted-foreground">
              Send a rental request to the landlord for this property.
            </p>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <RentalRequestForm propertyId={property.id} />

          <PropertySummaryCard property={property} />
        </div>

        <div className="flex items-start gap-4 rounded-xl border border-primary/15 bg-primary/5 p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-primary" />

          <div className="space-y-1">
            <h2 className="font-semibold">
              What happens next?
            </h2>

            <p className="text-sm text-muted-foreground">
              Your request will be sent to the landlord.
              You can check its status in My Requests
              on your dashboard. Payment is only available
              after approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
