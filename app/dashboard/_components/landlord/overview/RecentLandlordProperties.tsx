import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/lib/types";
import { propertyImage } from "@/app/dashboard/_components/landlord/propertyImage";

export default function RecentLandlordProperties({
  properties,
  hasError,
}: {
  properties: Property[];
  hasError: boolean;
}) {
  const money = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <Card className="gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">Your recent properties</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Check availability across your rental portfolio.
            </p>
          </div>
          <Link href="/dashboard/landlord/properties" className="text-sm font-semibold text-primary hover:underline">
            View all properties <ArrowRight className="inline size-4" />
          </Link>
        </div>

        {hasError ? (
          <p role="alert" className="mt-6 text-sm text-destructive">
            Could not load your properties. Refresh to try again.
          </p>
        ) : properties.length === 0 ? (
          <p className="mt-6 rounded-lg bg-muted p-6 text-center text-sm text-muted-foreground">
            You have no properties yet.
          </p>
        ) : (
          <div className="mt-5 divide-y">
            {properties.map((property) => (
              <div key={property.id} className="flex flex-wrap items-center gap-4 py-3 first:pt-0 last:pb-0">
                <div className="relative h-13 w-18 shrink-0 overflow-hidden rounded-lg bg-accent">
                  <Image
                    src={propertyImage(property.picture)}
                    alt={property.title}
                    fill
                    unoptimized
                    sizes="72px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-48 flex-1">
                  <p className="font-semibold">{property.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{property.location}</p>
                </div>
                <p className="min-w-28 font-semibold">{money(property.price)}</p>
                <Badge
                  variant="secondary"
                  className={property.availability === "AVAILABLE" ? "min-w-24 bg-green-100 text-green-800" : "min-w-24 bg-gray-100 text-gray-700"}
                >
                  {property.availability === "AVAILABLE" ? "Available" : "Rented"}
                </Badge>
                <Link
                  href={`/dashboard/landlord/properties?edit=${property.id}`}
                  className="inline-flex min-w-20 items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Manage <ArrowRight className="size-3" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
