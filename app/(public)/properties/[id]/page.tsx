
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";

import { getPropertyDetails } from "../../_actions/getPropertyDetails";
import PropertyDetailsHeader from "../../_components/properties/details/PropertyDetailsHeader";
import PropertyImage from "../../_components/properties/details/PropertyImage";
import PropertyAbout from "../../_components/properties/details/PropertyAbout";
import PropertyOverview from "../../_components/properties/details/PropertyOverview";
import PropertyAmenities from "../../_components/properties/details/PropertyAmenities";
import RentalRequest from "../../_components/properties/details/RentalRequest";
import PropertyReviews from "../../_components/properties/details/PropertyReviews";


type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Property Details | RentNest",
  description: "View rental property details on RentNest",
};



const PropertyDetailsPage = async({
  params,
}: PageProps)=>{
  const { id } = await params;

  const result = await getPropertyDetails(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const property = result.data;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-10 px-4 pb-16 pt-9 xl:px-0">
        {/* Property Title, Location, Availability */}
        <PropertyDetailsHeader property={property} />

        {/* Single main Image */}
        <PropertyImage
          title={property.title}
          picture={property.picture}
        />

        {/* Property Information and Rental Card */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
          <div className="space-y-10">
            <PropertyAbout
              description={property.description}
            />

            <Separator />

            <PropertyOverview property={property} />

            <PropertyAmenities
              amenities={property.amenities}
            />
          </div>

          <aside>
            <RentalRequest property={property} />
          </aside>
        </div>

        <Separator />

        {/* Customer Reviews */}
        <PropertyReviews
          reviews={property.reviews ?? []}
        />
      </div>
    </div>
  );
}


export default  PropertyDetailsPage