import { House } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCategories } from "../../_actions/getProperties";

const CategoryList = async () => {
  const categories = await getAllCategories();

  if (categories.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No categories available yet.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Card key={category.id} className="h-full border-border bg-background">
          <CardContent className="flex h-full flex-col gap-5">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <House className="size-6" aria-hidden="true" />
            </span>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                {category.categoryName}
              </h3>
              <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                {category.description || `Explore ${category.categoryName} rentals.`}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategoryList;
