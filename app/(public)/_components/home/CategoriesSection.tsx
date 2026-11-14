import { Suspense } from "react";
import CategoryList from "./CategoryList";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CategoriesSkeleton = () => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 3 }).map((_, index) => (
      <Card key={index} className="bg-background">
        <CardContent className="space-y-5">
          <Skeleton className="size-12 rounded-xl" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const CategoriesSection = () => (
  <section className="border-t border-border bg-muted/40 py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-3 text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Our property categories
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Property Types Available on RentNest
        </h2>
        <p className="text-muted-foreground">
          See the different types of rental properties available on RentNest.
        </p>
      </div>
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  </section>
);

export default CategoriesSection;
