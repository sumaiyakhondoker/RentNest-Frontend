"use client";

import { useActionState, useEffect, useState } from "react";
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
  const isEdit = mode === "edit" && !!post;
  const action = saveLandlordProperty.bind(null, isEdit ? "edit" : "create", post?.id);
  const [state, formAction, pending] = useActionState(action, null);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen && openOnLoad) {
      router.replace("/dashboard/landlord/properties", { scroll: false });
    }
  };

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
      setOpen(false);
      router.replace("/dashboard/landlord/properties", { scroll: false });
      router.refresh();
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="outline" size="sm" className="rounded-lg">
            <Pencil className="size-4" /> Edit
          </Button>
        ) : (
          <Button className="h-11 rounded-lg px-5">
            <Plus className="size-4" /> Add Property
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Property" : "Add Property"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update your property details." : "Add a new property to your portfolio."}
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
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
            <Label htmlFor={`${post?.id || "new"}-picture`}>Picture URL (optional)</Label>
            <Input id={`${post?.id || "new"}-picture`} name="picture" type="url" defaultValue={post?.picture || ""} placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${post?.id || "new"}-amenities`}>Amenities (comma separated)</Label>
            <Input id={`${post?.id || "new"}-amenities`} name="amenities" defaultValue={post?.amenities?.join(", ") || ""} placeholder="Wi-Fi, Parking" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
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
            <div className="space-y-2">
              <Label htmlFor={`${post?.id || "new"}-availability`}>Availability</Label>
              <Select name="availability" defaultValue={post?.availability || "AVAILABLE"}>
                <SelectTrigger id={`${post?.id || "new"}-availability`} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AVAILABLE">Available</SelectItem>
                  <SelectItem value="RENTED">Rented</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {categories.length === 0 && !isEdit && <p className="text-sm text-destructive">Categories are unavailable. Refresh this page.</p>}
          {state && !state.success && <p role="alert" className="text-sm text-destructive">{state.message}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={pending || (!isEdit && categories.length === 0)}>
              {pending ? "Saving..." : isEdit ? "Save changes" : "Create property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
