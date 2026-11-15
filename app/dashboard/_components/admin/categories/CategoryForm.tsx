"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { createAdminCategory } from "@/app/dashboard/_actions/admin/createAdminCategory";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CategoryFormValues = {
  categoryName: string;
  description: string;
};

const CategoryForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    defaultValues: { categoryName: "", description: "" },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    const formData = new FormData();
    formData.set("categoryName", data.categoryName);
    formData.set("description", data.description);
    const result = await createAdminCategory(formData);
    if (result.success) {
      reset();
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Card id="add-category" className="gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-xl font-bold">Add a category</h2>
        <p className="mt-1 text-sm text-muted-foreground">Name a property type tenants can filter by.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="category-name">Category name</Label>
            <Input
              id="category-name"
              placeholder="e.g. Townhouse"
              maxLength={255}
              {...register("categoryName", { required: "Enter a category name." })}
            />
            {errors.categoryName && <p className="text-sm text-destructive">{errors.categoryName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-description">Description</Label>
            <Textarea
              id="category-description"
              placeholder="Describe this property type"
              {...register("description", { required: "Enter a description." })}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full rounded-lg">
            {isSubmitting ? "Saving..." : "Save category"}
            {!isSubmitting && <ArrowRight className="size-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
