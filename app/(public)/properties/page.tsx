import { Suspense } from "react";
import type { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllCategories, type PropertiesQuery } from "../_actions/getProperties";
import PropertyHeader from "../_components/properties/PropertyHeader";
import PropertySearchBar from "../_components/properties/PropertySearchBar";
import AllPropertiesList from "../_components/properties/AllPropertiesList";
import PropertiesSkeleton from "../_components/properties/PropertiesSkeleton";

export const metadata: Metadata = {
  title: "Explore Properties | RentNest",
  description: "Find your next rental home with RentNest.",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(value: string | string[] | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

async function PropertiesContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const query: PropertiesQuery = {
    search: getParam(params.search),
    location: getParam(params.location),
    category: getParam(params.category),
    amenities: getParam(params.amenities),
    minPrice: getParam(params.minPrice),
    maxPrice: getParam(params.maxPrice),
    sortBy: getParam(params.sortBy),
    sortOrder: getParam(params.sortOrder),
    page: getParam(params.page) || "1",
    limit: "6",
  };

  const categories = await getAllCategories();
  const resultsKey = JSON.stringify(query);

  return (
    <div className="mt-10 grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside aria-label="Property search and filters" className="lg:sticky lg:top-24">
        <PropertySearchBar key={resultsKey} categories={categories} query={query} />
      </aside>

      <div className="min-w-0">
        <Suspense
          key={resultsKey}
          fallback={
            <div className="space-y-8">
              <div className="space-y-2">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-4 w-72" />
              </div>
              <PropertiesSkeleton />
            </div>
          }
        >
          <AllPropertiesList query={query} />
        </Suspense>
      </div>
    </div>
  );
}

export default function PropertiesPage({ searchParams }: PageProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-9 xl:px-0">
        <PropertyHeader />
        <Suspense
          fallback={
            <div className="mt-10 grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
              <div className="hidden space-y-5 rounded-2xl border p-5 lg:block">
                <Skeleton className="h-6 w-40" />
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-10 w-full" />
                ))}
              </div>
              <div className="min-w-0 space-y-8">
                <Skeleton className="h-8 w-56" />
                <PropertiesSkeleton />
              </div>
            </div>
          }
        >
          <PropertiesContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
