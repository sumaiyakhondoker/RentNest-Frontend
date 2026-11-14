"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
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

export default function PropertyFormDialog({
  mode = "create",
  post,
  categories,
  openOnLoad = false,
}: {
  mode?: "create" | "edit";
  post?: Property;
  categories: Category[];
  openOnLoad?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(openOnLoad);
  const [available, setAvailable] = useState(post?.availability !== "RENTED");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const isEdit = mode === "edit" && !!post;

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setAvailable(post?.availability !== "RENTED");
      setError("");
    }
    setOpen(nextOpen);
    if (!nextOpen && openOnLoad) {
      router.replace("/dashboard/landlord/properties", { scroll: false });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError("");
    startTransition(async () => {
      const result = await saveLandlordProperty(isEdit ? "edit" : "create", post?.id, null, formData);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
        router.replace("/dashboard/landlord/properties", { scroll: false });
        router.refresh();
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    });
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
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit listing" : "Create listing"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update your property listing." : "Add a new property to your listings."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-sm font-semibold">Listing details</h3>
          <div className="space-y-2">
            <Label htmlFor={`${post?.id || "new"}-title`}>Property title</Label>
            <Input id={`${post?.id || "new"}-title`} name="title" defaultValue={post?.title || ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${post?.id || "new"}-description`}>Description</Label>
            <Textarea id={`${post?.id || "new"}-description`} name="description" defaultValue={post?.description || ""} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${post?.id || "new"}-location`}>Location</Label>
              <Input id={`${post?.id || "new"}-location`} name="location" defaultValue={post?.location || ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${post?.id || "new"}-price`}>Monthly rent (BDT)</Label>
              <Input id={`${post?.id || "new"}-price`} name="price" type="number" min="1" step="1" defaultValue={post?.price || ""} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${post?.id || "new"}-amenities`}>Amenities (comma separated)</Label>
            <Input id={`${post?.id || "new"}-amenities`} name="amenities" defaultValue={post?.amenities?.join(", ") || ""} placeholder="Wi-Fi, Parking" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${post?.id || "new"}-category`}>Category</Label>
            {categories.length > 0 ? (
              <Select name="categoryId" defaultValue={post?.categoryId}>
                <SelectTrigger id={`${post?.id || "new"}-category`} className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>{category.categoryName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : post ? (
              <Input value={post.categoryId} disabled aria-label="Current category" />
            ) : (
              <Input value="No categories available" disabled aria-label="Category unavailable" />
            )}
            {categories.length === 0 && post && <input type="hidden" name="categoryId" value={post.categoryId} />}
          </div>

          <div className="space-y-3 border-t pt-4">
            <h3 className="text-sm font-semibold">Listing photo</h3>
            <div className="space-y-2">
              <Label htmlFor={`${post?.id || "new"}-picture`}>Image URL (optional)</Label>
              <Input
                id={`${post?.id || "new"}-picture`}
                name="picture"
                type="url"
                defaultValue={post?.picture || ""}
                placeholder="https://example.com/property.jpg"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t pt-4">
            <div className="space-y-1">
              <Label htmlFor={`${post?.id || "new"}-availability`}>Available for rent</Label>
              <p className="text-xs text-muted-foreground">
                {available ? "Tenants can see this listing as available." : "This listing is marked as rented."}
              </p>
            </div>
            <input type="hidden" name="availability" value={available ? "AVAILABLE" : "RENTED"} />
            <Switch
              id={`${post?.id || "new"}-availability`}
              checked={available}
              onCheckedChange={setAvailable}
              aria-label="Available for rent"
            />
          </div>
          {categories.length === 0 && !isEdit && <p className="text-sm text-destructive">Categories are unavailable. Refresh this page.</p>}
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={pending || (!isEdit && categories.length === 0)}>
              {pending ? "Saving..." : isEdit ? "Save changes" : "Create listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
