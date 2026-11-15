import { Plus } from "lucide-react";
import { getAllCategories } from "@/app/(public)/_actions/getProperties";
import { getAdminProperties } from "@/app/dashboard/_actions/admin/getAdminProperties";
import { Button } from "@/components/ui/button";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";

export default async function AdminCategoriesContent() {
  const [categories, propertiesResult] = await Promise.all([
    getAllCategories().catch(() => null),
    getAdminProperties(),
  ]);
  const properties = propertiesResult.success ? propertiesResult.data : null;

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-5 py-7 sm:px-8 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-wide text-primary">PROPERTY CATEGORIES</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Manage property categories</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep property types consistent across RentNest.
          </p>
        </div>
        <Button asChild className="h-11 rounded-lg px-5">
          <a href="#add-category"><Plus className="size-4" /> Add category</a>
        </Button>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.9fr)_minmax(300px,1fr)]">
        <CategoryList categories={categories} properties={properties} />
        <CategoryForm />
      </div>
    </main>
  );
}
