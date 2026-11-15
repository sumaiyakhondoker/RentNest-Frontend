"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Pencil, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Property } from "@/lib/types";
import type { Category } from "@/app/(public)/_actions/getProperties";
import { saveLandlordProperty } from "@/app/dashboard/_actions/landlord/saveLandlordProperty";

type PropertyFormValues = {
  title: string;
  description: string;
  location: string;
  price: string;
  amenities: string;
  categoryId: string;
  picture: string;
  available: boolean;
};

const PropertyFormDialog = ({
  mode = "create",
  post,
  categories,
  openOnLoad = false,
}: {
  mode?: "create" | "edit";
  post?: Property;
  categories: Category[];
  openOnLoad?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [editOpen, setEditOpen] = useState(openOnLoad);
  const [error, setError] = useState("");
  const isEdit = mode === "edit" && !!post;
  const open = isEdit ? editOpen : pathname === "/dashboard/landlord/properties/new";
  const initialValues: PropertyFormValues = {
    title: post?.title || "",
    description: post?.description || "",
    location: post?.location || "",
    price: post?.price?.toString() || "",
    amenities: post?.amenities?.join(", ") || "",
    categoryId: post?.categoryId || "",
    picture: post?.picture || "",
    available: post?.availability !== "RENTED",
  };
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormValues>({ defaultValues: initialValues });
  const available = watch("available");

  const updateCreateUrl = (nextOpen: boolean) => {
    if (!isEdit) {
      window.history.replaceState(
        null,
        "",
        nextOpen ? "/dashboard/landlord/properties/new" : "/dashboard/landlord/properties",
      );
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      reset(initialValues);
      setError("");
    }
    if (isEdit) {
      setEditOpen(nextOpen);
      if (!nextOpen && openOnLoad) {
        router.replace("/dashboard/landlord/properties", { scroll: false });
      }
    } else {
      updateCreateUrl(nextOpen);
    }
  };

  const onSubmit = async (data: PropertyFormValues) => {
    const formData = new FormData();
    formData.set("title", data.title);
    formData.set("description", data.description);
    formData.set("location", data.location);
    formData.set("price", data.price);
    formData.set("amenities", data.amenities);
    formData.set("categoryId", data.categoryId);
    formData.set("picture", data.picture);
    formData.set("availability", data.available ? "AVAILABLE" : "RENTED");
    setError("");
    const result = await saveLandlordProperty(isEdit ? "edit" : "create", post?.id, null, formData);
    if (result.success) {
      toast.success(result.message);
      if (isEdit) {
        setEditOpen(false);
        router.replace("/dashboard/landlord/properties", { scroll: false });
      } else {
        updateCreateUrl(false);
      }
      router.refresh();
    } else {
      setError(result.message);
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="outline" size="sm" className="rounded-lg">
            <Pencil className="size-4" /> Edit
          </Button>
        ) : (
          <Button className="h-11 rounded-lg px-5">
            <Plus className="size-4" /> Create listing
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="max-h-[85vh] overflow-y-auto sm:max-w-xl"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit listing" : "Create listing"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update your property listing." : "Add a new property to your listings."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <h3 className="text-sm font-semibold">Listing details</h3>
          <div className="space-y-2">
            <Label htmlFor={`${post?.id || "new"}-title`}>Property title</Label>
            <Input
              id={`${post?.id || "new"}-title`}
              aria-invalid={!!errors.title}
              {...register("title", { required: "Property title is required." })}
            />
            {errors.title && <p role="alert" className="text-sm text-destructive">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${post?.id || "new"}-description`}>Description</Label>
            <Textarea
              id={`${post?.id || "new"}-description`}
              aria-invalid={!!errors.description}
              {...register("description", { required: "Description is required." })}
            />
            {errors.description && <p role="alert" className="text-sm text-destructive">{errors.description.message}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${post?.id || "new"}-location`}>Location</Label>
              <Input
                id={`${post?.id || "new"}-location`}
                aria-invalid={!!errors.location}
                {...register("location", { required: "Location is required." })}
              />
              {errors.location && <p role="alert" className="text-sm text-destructive">{errors.location.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${post?.id || "new"}-price`}>Monthly rent (BDT)</Label>
              <Input
                id={`${post?.id || "new"}-price`}
                type="number"
                min="1"
                step="1"
                aria-invalid={!!errors.price}
                {...register("price", {
                  required: "Monthly rent is required.",
                  validate: (value) => Number.isInteger(Number(value)) && Number(value) > 0 || "Enter a valid rent amount.",
                })}
              />
              {errors.price && <p role="alert" className="text-sm text-destructive">{errors.price.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${post?.id || "new"}-amenities`}>Amenities (comma separated)</Label>
            <Input
              id={`${post?.id || "new"}-amenities`}
              placeholder="Wi-Fi, Parking"
              aria-invalid={!!errors.amenities}
              {...register("amenities", {
                validate: (value) => value.split(",").some((item) => item.trim()) || "Add at least one amenity.",
              })}
            />
            {errors.amenities && <p role="alert" className="text-sm text-destructive">{errors.amenities.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${post?.id || "new"}-category`}>Category</Label>
            {categories.length > 0 ? (
              <Controller
                name="categoryId"
                control={control}
                rules={{ required: "Choose a category." }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id={`${post?.id || "new"}-category`} className="w-full" aria-invalid={!!errors.categoryId}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.categoryName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            ) : post ? (
              <Input value={post.categoryId} disabled aria-label="Current category" />
            ) : (
              <Input value="No categories available" disabled aria-label="Category unavailable" />
            )}
            {errors.categoryId && <p role="alert" className="text-sm text-destructive">{errors.categoryId.message}</p>}
          </div>

          <div className="space-y-3 border-t pt-4">
            <h3 className="text-sm font-semibold">Listing photo</h3>
            <div className="space-y-2">
              <Label htmlFor={`${post?.id || "new"}-picture`}>Image URL (optional)</Label>
              <Input
                id={`${post?.id || "new"}-picture`}
                type="url"
                placeholder="https://example.com/property.jpg"
                aria-invalid={!!errors.picture}
                {...register("picture", {
                  validate: (value) => !value || /^https?:\/\//i.test(value) || "Enter a valid image URL.",
                })}
              />
              {errors.picture && <p role="alert" className="text-sm text-destructive">{errors.picture.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t pt-4">
            <div className="space-y-1">
              <Label htmlFor={`${post?.id || "new"}-availability`}>Available for rent</Label>
              <p className="text-xs text-muted-foreground">
                {available ? "Tenants can see this listing as available." : "This listing is marked as rented."}
              </p>
            </div>
            <Controller
              name="available"
              control={control}
              render={({ field }) => (
                <Switch
                  id={`${post?.id || "new"}-availability`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label="Available for rent"
                />
              )}
            />
          </div>
          {categories.length === 0 && !isEdit && <p className="text-sm text-destructive">Categories are unavailable. Refresh this page.</p>}
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting || (!isEdit && categories.length === 0)}>
              {isSubmitting ? "Saving..." : isEdit ? "Save changes" : "Create listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyFormDialog;
