
"use client";

import { useRouter, useSearchParams } from "next/navigation";
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

  let sortValue = "newest";
  if (currentSortBy === "price") {
    sortValue = currentSortOrder === "asc" ? "price-asc" : "price-desc";
  } else if (currentSortBy === "title") {
    sortValue = currentSortOrder === "asc" ? "title-asc" : "title-desc";
  } else if (currentSortBy === "createdAt" && currentSortOrder === "asc") {
    sortValue = "oldest";
  }

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

      case "title-asc":
        params.set("sortBy", "title");
        params.set("sortOrder", "asc");
        break;

      case "title-desc":
        params.set("sortBy", "title");
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
        <Select
          value={sortValue}
          onValueChange={handleSort}
        >
          <SelectTrigger
            aria-label="Sort properties"
            className="h-10.5 w-60 border-0 bg-transparent text-[13px] shadow-none focus-visible:ring-0"
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
            <SelectItem value="title-asc">
              Title: A to Z
            </SelectItem>
            <SelectItem value="title-desc">
              Title: Z to A
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}


export default PropertyFilter
