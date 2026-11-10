/**
 * 
 * এখানে picture backend থেকে আসছে। External image hostname allow করার জন্য next.config.ts-এ image hosting domain configure করতে হবে। Image URL কোন host থেকে আসছে তা জানা না থাকায় এখন অনুমান করে কোনো domain add করছি না।
 */





import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Property } from "@/lib/types";


type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({
  property,
}: PropertyCardProps) {
  return (
    <Card className="group gap-0 overflow-hidden border-border py-0 transition-shadow hover:shadow-lg">
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        {property.picture ? (
          <Image
            src={property.picture}
            alt={property.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}

        <Badge
          variant={
            property.availability === "AVAILABLE"
              ? "default"
              : "secondary"
          }
          className="absolute left-4 top-4"
        >
          {property.availability === "AVAILABLE"
            ? "Available"
            : "Rented"}
        </Badge>
      </div>

      <CardContent className="flex-1 space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-lg font-semibold text-card-foreground">
            {property.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {property.location}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {property.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline">
              {amenity}
            </Badge>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-2xl font-bold text-primary">
            ৳{property.price.toLocaleString("en-BD")}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              / month
            </span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button className="w-full" asChild>
          <Link href={`/properties/${property.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
