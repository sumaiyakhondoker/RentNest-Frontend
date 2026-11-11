
import { Card, CardContent } from "@/components/ui/card";
import type { PropertyDetails } from "@/lib/types";

type Props = {
  property: PropertyDetails;
};

 const PropertyOverview=({
  property,
}: Props)=> {


  // const details = [
  //   {
  //     label: "Monthly rent",
  //     value: `৳${property.price.toLocaleString("en-BD")}`,
  //     icon: "৳",
  //   },
  //   {
  //     label: "Availability",
  //     value: property.availability === "AVAILABLE"
  //       ? "Available"
  //       : "Rented",
  //     icon: "✓",
  //   },
  //   {
  //     label: "Amenities",
  //     value: property.amenities.length.toString(),
  //     icon: "✦",
  //   },
  //   {
  //     label: "Reviews",
  //     value: property.reviews.length.toString(),
  //     icon: "★",
  //   },
  // ];

  return (
    <section className="space-y-6">
      <h2 className="text-[22px] font-bold">
        Property overview
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* {details.map((detail) => (
          <Card
            key={detail.label}
            className="h-[100px] rounded-xl py-0 shadow-none"
          >
            <CardContent className="flex h-full flex-col justify-between p-4">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="text-xl font-semibold text-primary"
                >
                  {detail.icon}
                </span>

                <span className="truncate text-sm font-semibold">
                  {detail.value}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                {detail.label}
              </p>
            </CardContent>
          </Card>
        ))} */}
      </div>
    </section>
  );
}

export default PropertyOverview
