
import Link from "next/link";
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
      <nav className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/properties" className="hover:text-primary">
          Explore Properties
        </Link>
        <span>/</span>
        <span className="text-foreground">
          Property Details
        </span>
      </nav>

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
