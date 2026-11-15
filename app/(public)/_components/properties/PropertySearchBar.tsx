"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListFilter, MapPin, Search, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { propertySearchSchema, type PropertySearchFormValues } from "@/lib/validations/property-search.schema";
import type { Category, PropertiesQuery } from "../../_actions/getProperties";

type Props = {
  categories: Category[];
  query: PropertiesQuery;
};

function PropertySearchForm({
  categories,
  query,
  idPrefix,
  onApplied,
}: Props & { idPrefix: string; onApplied?: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertySearchFormValues>({
    resolver: zodResolver(propertySearchSchema),
    defaultValues: {
      search: query.search || "",
      location: query.location || "",
      category: query.category || "all",
      minPrice: query.minPrice || "",
      maxPrice: query.maxPrice || "",
      amenities: query.amenities || "",
    },
  });

  function onSubmit(data: PropertySearchFormValues) {
    const params = new URLSearchParams(searchParams.toString());
    ["search", "location", "category", "minPrice", "maxPrice", "amenities", "page"].forEach((key) => params.delete(key));

    if (data.search.trim()) params.set("search", data.search.trim());
    if (data.location.trim()) params.set("location", data.location.trim());
    if (data.category !== "all") params.set("category", data.category);

    const amenities = data.amenities.split(",").map((item) => item.trim()).filter(Boolean).join(",");
    if (amenities) params.set("amenities", amenities);

    if (data.minPrice) params.set("minPrice", data.minPrice);
    if (data.maxPrice) params.set("maxPrice", data.maxPrice);

    startTransition(() => {
      router.push(`/properties?${params.toString()}`);
    });
  }

  function resetFilters() {
    reset({ search: "", location: "", category: "all", minPrice: "", maxPrice: "", amenities: "" });
    const params = new URLSearchParams(searchParams.toString());
    ["search", "location", "category", "minPrice", "maxPrice", "amenities", "page"].forEach((key) => params.delete(key));
    router.push(params.toString() ? `/properties?${params.toString()}` : "/properties");
    onApplied?.();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-search`}>Search properties</Label>
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id={`${idPrefix}-search`}
            {...register("search")}
            aria-invalid={!!errors.search}
            placeholder="Title or description"
            className="h-10 rounded-lg pl-9"
          />
        </div>
        {errors.search && <p className="text-xs text-destructive">{errors.search.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-location`}>Location</Label>
        <div className="relative">
          <MapPin aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id={`${idPrefix}-location`}
            {...register("location")}
            aria-invalid={!!errors.location}
            placeholder="Exact location"
            className="h-10 rounded-lg pl-9"
          />
        </div>
        <p className="text-xs text-muted-foreground">Use the location shown on the listing.</p>
        {errors.location && <p className="text-xs text-destructive">{errors.location.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-category`}>Property type</Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id={`${idPrefix}-category`} ref={field.ref} onBlur={field.onBlur} aria-invalid={!!errors.category} className="h-10 w-full rounded-lg">
                <SelectValue placeholder="All property types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All property types</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.categoryName}>{category.categoryName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Monthly rent (৳)</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor={`${idPrefix}-min-price`} className="text-xs text-muted-foreground">Minimum</Label>
            <Input id={`${idPrefix}-min-price`} type="number" min="0" step="1" inputMode="numeric" placeholder="Any" {...register("minPrice")} aria-invalid={!!errors.minPrice} className="h-10 rounded-lg" />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`${idPrefix}-max-price`} className="text-xs text-muted-foreground">Maximum</Label>
            <Input id={`${idPrefix}-max-price`} type="number" min="0" step="1" inputMode="numeric" placeholder="Any" {...register("maxPrice")} aria-invalid={!!errors.maxPrice} className="h-10 rounded-lg" />
          </div>
        </div>
        {errors.minPrice && <p className="text-xs text-destructive">{errors.minPrice.message}</p>}
        {errors.maxPrice && <p className="text-xs text-destructive">{errors.maxPrice.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-amenities`}>Amenities</Label>
        <div className="relative">
          <Tags aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id={`${idPrefix}-amenities`}
            {...register("amenities")}
            aria-invalid={!!errors.amenities}
            placeholder="Wi-Fi, Parking"
            className="h-10 rounded-lg pl-9"
          />
        </div>
        <p className="text-xs text-muted-foreground">Separate exact amenity names with commas.</p>
        {errors.amenities && <p className="text-xs text-destructive">{errors.amenities.message}</p>}
      </div>

      <div className="space-y-2 pt-1">
        <Button type="submit" disabled={isSubmitting || isPending} className="h-10 w-full rounded-lg">
          {isSubmitting || isPending ? <Spinner /> : <Search aria-hidden="true" className="size-4" />}
          {isSubmitting || isPending ? "Searching..." : "Search properties"}
        </Button>
        <Button type="button" variant="outline" onClick={resetFilters} className="h-10 w-full rounded-lg">
          Reset filters
        </Button>
      </div>
    </form>
  );
}

const PropertySearchBar = ({ categories, query }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-center gap-2 rounded-lg sm:w-auto">
              <ListFilter aria-hidden="true" className="size-4" /> Search & filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(90vw,360px)] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Search & filters</SheetTitle>
              <SheetDescription>Find a rental that fits your needs.</SheetDescription>
            </SheetHeader>
            <div className="px-6 pb-6">
              <PropertySearchForm categories={categories} query={query} idPrefix="mobile" onApplied={() => setMobileOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="hidden gap-0 rounded-2xl py-0 shadow-sm lg:block">
        <CardHeader className="border-b px-5 py-5">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ListFilter aria-hidden="true" className="size-5 text-primary" /> Search & filters
          </CardTitle>
          <p className="text-sm text-muted-foreground">Find a place that fits you.</p>
        </CardHeader>
        <CardContent className="p-5">
          <PropertySearchForm categories={categories} query={query} idPrefix="desktop" />
        </CardContent>
      </Card>
    </>
  );
};

export default PropertySearchBar;
