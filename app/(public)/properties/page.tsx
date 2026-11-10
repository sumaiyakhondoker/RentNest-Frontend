
import { Suspense } from "react";
import type { Metadata } from "next";

import PropertiesSkeleton from "../_components/properties/PropertiesSkeleton";

import {
  getAllCategories,
  type PropertiesQuery,
} from "../_actions/getProperties";
import PropertyHeader from "../_components/properties/PropertyHeader";
import PropertySearchBar from "../_components/properties/PropertySearchBar";
import AllPropertiesList from "../_components/properties/AllPropertiesList";

export const metadata: Metadata = {
  title: "Explore Properties | RentNest",
  description: "Find your next rental home with RentNest.",
};

type PageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

function getParam(
  value: string | string[] | undefined,
): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export default async function PropertiesPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const query: PropertiesQuery = {
    location: getParam(params.location),
    category: getParam(params.category),
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
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-9 xl:px-0">
        <PropertyHeader />

        <div className="mt-10">
          <PropertySearchBar
            key={resultsKey}
            categories={categories}
            query={query}
          />
        </div>

        <div className="mt-10">
          <Suspense
            key={resultsKey}
            fallback={
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="h-8 w-56 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-72 animate-pulse rounded bg-muted" />
                </div>

                <PropertiesSkeleton />
              </div>
            }
          >
            <AllPropertiesList query={query} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
