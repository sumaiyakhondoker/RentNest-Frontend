


import { Property } from "@/lib/types";
import PropertyFilter from "./PropertyFilter";
import PropertyCard from "./PropertyCard";
import PropertiesPagination from "./PropertiesPagination";
import { getAllProperties, PropertiesQuery } from "../../_actions/getProperties";

type AllPropertiesListProps = {
  query: PropertiesQuery;
};

 const AllPropertiesList= async({
  query,
}: AllPropertiesListProps) =>{
  const result = await getAllProperties(query);

  const properties = result.data.allProperties;
  const meta = result.data.meta;

  return (
    <section className="space-y-8">
      <PropertyFilter
        totalProperties={meta.totalProperties}
      />

      {properties.length === 0 ? (
        <div className="rounded-xl border border-border bg-card px-6 py-20 text-center">
          <h3 className="text-xl font-semibold">
            No properties found
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Try changing your location, property type,
            or price range.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property: Property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      )}

      <PropertiesPagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        query={query}
      />
    </section>
  );
}

export default AllPropertiesList