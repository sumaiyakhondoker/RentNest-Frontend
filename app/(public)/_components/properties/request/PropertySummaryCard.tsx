
"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/lib/types";

type Props = {
  property: Property;
};

export default function PropertySummaryCard({
  property,
}: Props) {
  const [imageError, setImageError] = useState(false);

  const picture = property.picture?.trim();

  let validImage = false;

  try {
    const url = new URL(picture || "");
    validImage =
      url.protocol === "https:" ||
      url.protocol === "http:";
  } catch {
    validImage = false;
  }

  const imageSrc =
    validImage && !imageError && picture
      ? picture
      : "/property-placeholder.png";

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl py-0 shadow-sm">
      <CardContent className="space-y-5 p-5">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
          <Image
            src={imageSrc}
            alt={property.title}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 380px"
            className="object-cover"
            onError={() => setImageError(true)}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">
            {property.title}
          </h2>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" />
            {property.location}
          </p>
        </div>

        <div className="flex items-center justify-between border-t pt-5">
          <span className="text-sm text-muted-foreground">
            Monthly Rent
          </span>

          <span className="text-xl font-bold text-primary">
            ৳{property.price.toLocaleString("en-BD")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
