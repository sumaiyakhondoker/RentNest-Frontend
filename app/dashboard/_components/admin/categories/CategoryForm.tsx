"use client";

import { useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { createAdminCategory } from "@/app/dashboard/_actions/admin/createAdminCategory";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CategoryForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await createAdminCategory(formData);
      if (result.success) {
        form.reset();
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <Card id="add-category" className="gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-xl font-bold">Add a category</h2>
        <p className="mt-1 text-sm text-muted-foreground">Name a property type tenants can filter by.</p>
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="category-name">Category name</Label>
            <Input id="category-name" name="categoryName" placeholder="e.g. Townhouse" required maxLength={255} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-description">Description</Label>
            <Textarea id="category-description" name="description" placeholder="Describe this property type" required />
          </div>
          <Button type="submit" disabled={pending} className="w-full rounded-lg">
            {pending ? "Saving..." : "Save category"}
            {!pending && <ArrowRight className="size-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
