
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import type { PropertyDetails } from "@/lib/types";
import { MapPin } from "lucide-react";

type Props = {
  property: PropertyDetails;
};

 const PropertyDetailsHeader =({ property }: Props) =>{
  const available = property.availability === "AVAILABLE";

  return (
    <section className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList className="gap-3 text-xs font-medium uppercase">
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link href="/properties">Explore Properties</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Property Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight md:text-[37px]">
          {property.title}
        </h1>

        <p className="text-[15px] text-muted-foreground flex items-center gap-1">
          <MapPin size={15} />{property.location}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant={available ? "default" : "secondary"}
            className="rounded-full px-4 py-2 text-xs"
          >
            {available ? "Available" : "Rented"}
          </Badge>

          <Badge
            variant="secondary"
            className="rounded-full px-4 py-2 text-xs"
          >
            {property.amenities.length} Amenities
          </Badge>

          <span className="text-xs text-muted-foreground">
            Listed on{" "}
            {new Date(property.createdAt).toLocaleDateString(
              "en-BD",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )}
          </span>
        </div>
      </div>
    </section>
  );
}

export default PropertyDetailsHeader
