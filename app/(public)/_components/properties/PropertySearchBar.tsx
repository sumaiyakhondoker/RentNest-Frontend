
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  propertySearchSchema,
  type PropertySearchFormValues,
} from "@/lib/validations/property-search.schema";

import type {
  Category,
  PropertiesQuery,
} from "../../_actions/getProperties";

type PropertySearchBarProps = {
  categories: Category[];
  query: PropertiesQuery;
};

function getSelectedPrice(
  query: PropertiesQuery,
): PropertySearchFormValues["priceRange"] {
  const min = query.minPrice || "";
  const max = query.maxPrice || "";

  if (!min && !max) return "all";
  if (!min && max === "10000") return "under-10000";
  if (min === "10000" && max === "20000") return "10000-20000";
  if (min === "20000" && max === "40000") return "20000-40000";
  if (min === "40000" && !max) return "above-40000";

  return "all";
}

export default function PropertySearchBar({
  categories,
  query,
}: PropertySearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PropertySearchFormValues>({
    resolver: zodResolver(propertySearchSchema),
    defaultValues: {
      location: query.location || "",
      category: query.category || "all",
      priceRange: getSelectedPrice(query),
    },
  });

  function onSubmit(data: PropertySearchFormValues) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.delete("location");
    params.delete("category");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("page");

    if (data.location) {
      params.set("location", data.location.trim());
    }

    if (data.category !== "all") {
      params.set("category", data.category);
    }

    switch (data.priceRange) {
      case "under-10000":
        params.set("maxPrice", "10000");
        break;

      case "10000-20000":
        params.set("minPrice", "10000");
        params.set("maxPrice", "20000");
        break;

      case "20000-40000":
        params.set("minPrice", "20000");
        params.set("maxPrice", "40000");
        break;

      case "above-40000":
        params.set("minPrice", "40000");
        break;
    }

    const queryString = params.toString();

    router.push(
      queryString
        ? `/properties?${queryString}`
        : "/properties",
    );
  }

  return (
    <Card
      id="property-filters"
      className="rounded-[15px] border-border py-0 shadow-none"
    >
      <CardContent className="p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid items-center gap-3 lg:grid-cols-[1.2fr_1fr_1fr_211px] lg:gap-0"
        >
          {/* Location */}
          <div className="flex h-20 flex-col justify-center px-4">
            <label
              htmlFor="location"
              className="mb-2 text-[11px] font-semibold uppercase text-muted-foreground"
            >
              Location
            </label>

            <Input
              id="location"
              {...register("location")}
              aria-invalid={!!errors.location}
              placeholder="Search city or neighborhood"
              className="h-9 border-0 bg-transparent px-0 text-[15px] font-medium shadow-none focus-visible:ring-0"
            />

            {errors.location && (
              <p className="text-xs text-destructive">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Property Type */}
          <div className="flex h-20 flex-col justify-center border-border px-4 lg:border-l">
            <label
              id="category-label"
              className="mb-2 text-[11px] font-semibold uppercase text-muted-foreground"
            >
              Property Type
            </label>

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    ref={field.ref}
                    onBlur={field.onBlur}
                    aria-labelledby="category-label"
                    aria-invalid={!!errors.category}
                    className="w-full border-0 bg-transparent px-0 text-[15px] font-medium shadow-none focus-visible:ring-0"
                  >
                    <SelectValue placeholder="Any property type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      Any property type
                    </SelectItem>

                    {categories.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.categoryName}
                      >
                        {item.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.category && (
              <p className="text-xs text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Price Range */}
          <div className="flex h-20 flex-col justify-center border-border px-4 lg:border-l">
            <label
              id="price-label"
              className="mb-2 text-[11px] font-semibold uppercase text-muted-foreground"
            >
              Price Range
            </label>

            <Controller
              name="priceRange"
              control={control}
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    ref={field.ref}
                    onBlur={field.onBlur}
                    aria-labelledby="price-label"
                    aria-invalid={!!errors.priceRange}
                    className="w-full border-0 bg-transparent px-0 text-[15px] font-medium shadow-none focus-visible:ring-0"
                  >
                    <SelectValue placeholder="Any budget" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">
                      Any budget
                    </SelectItem>

                    <SelectItem value="under-10000">
                      Under ৳10,000
                    </SelectItem>

                    <SelectItem value="10000-20000">
                      ৳10,000 - ৳20,000
                    </SelectItem>

                    <SelectItem value="20000-40000">
                      ৳20,000 - ৳40,000
                    </SelectItem>

                    <SelectItem value="above-40000">
                      Above ৳40,000
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.priceRange && (
              <p className="text-xs text-destructive">
                {errors.priceRange.message}
              </p>
            )}
          </div>

          {/* Search Button */}
          <div className="flex items-center border-border px-3 lg:border-l lg:pl-6 lg:pr-0">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="h-14.5 w-full gap-3 rounded-[10px] text-[15px] font-semibold"
            >
              Search properties
              <span
                aria-hidden="true"
                className="text-xl"
              >
                ↗
              </span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
