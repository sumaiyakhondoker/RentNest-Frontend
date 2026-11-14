import Image from "next/image";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Property } from "@/lib/types";
import type { Category } from "@/app/(public)/_actions/getProperties";
import { propertyImage } from "@/app/dashboard/_components/landlord/propertyImage";
import PropertyFormDialog from "./PropertyFormDialog";
import DeletePropertyDialog from "./DeletePropertyDialog";

export default function PropertyCard({
  property,
  categories,
  openEdit,
}: {
  property: Property;
  categories: Category[];
  openEdit: boolean;
}) {
  const category = categories.find((item) => item.id === property.categoryId);
  const rent = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Card className="h-full gap-0 rounded-xl py-0 shadow-none">
      <div className="relative h-48 bg-accent">
        <Image
          src={propertyImage(property.picture)}
          alt={property.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />
      </div>
      <CardContent className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold">{property.title}</h2>
          <Badge variant="secondary" className={property.availability === "AVAILABLE"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-700"}
          >
            {property.availability === "AVAILABLE" ? "Available" : "Rented"}
          </Badge>
        </div>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-4" /> {property.location}
        </p>
        <p className="text-lg font-bold text-primary">{rent}<span className="text-sm font-normal text-muted-foreground"> / month</span></p>
        {category && <p className="text-xs text-muted-foreground">Category: {category.categoryName}</p>}
        <p className="line-clamp-3 text-sm text-muted-foreground">{property.description}</p>
        {property.amenities.length > 0 && (
          <p className="text-xs text-muted-foreground">Amenities: {property.amenities.join(", ")}</p>
        )}
      </CardContent>
      <CardFooter className="mt-auto justify-end gap-2 px-5 py-4">
        <PropertyFormDialog mode="edit" post={property} categories={categories} openOnLoad={openEdit} />
        <DeletePropertyDialog propertyId={property.id} propertyTitle={property.title} />
      </CardFooter>
    </Card>
  );
}
