import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PropertyList from "../properties/PropertyList";
import PropertiesSkeleton from "../properties/PropertiesSkeleton";

const PropertiesSection = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-3 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Explore Rentals
          </span>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Discover Your Next Home
          </h2>

          <p className="text-muted-foreground">
            Browse rental properties and find the perfect place for your next
            chapter.
          </p>
        </div>

        <Suspense fallback={<PropertiesSkeleton />}>
          <PropertyList />
        </Suspense>

        <div className="my-6 flex w-full items-center justify-center">
          <Button variant="outline" className="border-primary" asChild>
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection;
