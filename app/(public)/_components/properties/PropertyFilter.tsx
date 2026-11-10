
"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PropertyFilterProps = {
  totalProperties: number;
};

 const PropertyFilter=({
  totalProperties,
}: PropertyFilterProps)=> {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSortBy = searchParams.get("sortBy");
  const currentSortOrder = searchParams.get("sortOrder");

  const sortValue =
    currentSortBy === "price"
      ? currentSortOrder === "asc"
        ? "price-asc"
        : "price-desc"
      : currentSortBy === "createdAt" &&
          currentSortOrder === "asc"
        ? "oldest"
        : "newest";

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("page");

    switch (value) {
      case "price-asc":
        params.set("sortBy", "price");
        params.set("sortOrder", "asc");
        break;

      case "price-desc":
        params.set("sortBy", "price");
        params.set("sortOrder", "desc");
        break;

      case "oldest":
        params.set("sortBy", "createdAt");
        params.set("sortOrder", "asc");
        break;

      default:
        params.set("sortBy", "createdAt");
        params.set("sortOrder", "desc");
    }

    router.push(`/properties?${params.toString()}`);
  }

  function focusFilters() {
    const element = document.getElementById("location");

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    element?.focus({ preventScroll: true });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <div className="space-y-1">
        <h2 className="text-[25px] font-bold tracking-tight">
          Explore properties
        </h2>

        <p className="text-sm text-muted-foreground">
          Browse available rental listings
          <span className="ml-1">
            ({totalProperties} properties)
          </span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={focusFilters}
          className="h-10.5 rounded-[9px] px-4 text-[13px] font-semibold"
        >
          <span
            aria-hidden="true"
            className="mr-2 text-lg"
          >
            ☷
          </span>
          Filters
        </Button>

        <Select
          value={sortValue}
          onValueChange={handleSort}
        >
          <SelectTrigger
            aria-label="Sort properties"
            className="h-10.5 w-42.5 border-0 bg-transparent text-[13px] shadow-none focus-visible:ring-0"
          >
            <span className="text-muted-foreground">
              Sort:
            </span>
            <SelectValue />
          </SelectTrigger>

          <SelectContent align="end">
            <SelectItem value="newest">
              Newest
            </SelectItem>

            <SelectItem value="oldest">
              Oldest
            </SelectItem>

            <SelectItem value="price-asc">
              Price: Low to High
            </SelectItem>

            <SelectItem value="price-desc">
              Price: High to Low
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}


export default PropertyFilter