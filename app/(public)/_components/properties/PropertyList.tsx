import { Property } from "@/lib/types";
import { getHomeProperties} from "../../_actions/getProperties";
import PropertyCard from "./PropertyCard";

const PropertyList = async () => {
  const result = await getHomeProperties();
  const properties = result.data.allProperties

  if (!result.success || !result.data?.allProperties.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No properties available right now.
      </p>
    );
  }


  

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property: Property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;