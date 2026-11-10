
import { Badge } from "@/components/ui/badge";

type Props = {
  amenities: string[];
};

export default function PropertyAmenities({
  amenities,
}: Props) {
  return (
    <section className="space-y-6">
      <h2 className="text-[22px] font-bold">
        Amenities & features
      </h2>

      {amenities.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No amenities listed.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {amenities.map((amenity, index) => (
            <Badge
              key={`${amenity}-${index}`}
              variant="secondary"
              className="rounded-[9px] px-4 py-3 text-xs font-semibold"
            >
              <span className="mr-2 text-primary">
                ✓
              </span>
              {amenity}
            </Badge>
          ))}
        </div>
      )}
    </section>
  );
}
