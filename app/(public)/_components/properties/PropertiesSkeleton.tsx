import { Skeleton } from "@/components/ui/skeleton";

export default function PropertiesSkeleton() {
  return (
    <div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      aria-label="Loading properties"
      aria-busy="true"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-border"
        >
          <Skeleton className="aspect-4/3 rounded-none" />

          <div className="space-y-4 p-5">
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>

            <div className="border-t border-border pt-4">
              <Skeleton className="h-7 w-32" />
            </div>

            <Skeleton className="h-9 w-full rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
