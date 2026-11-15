"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { createReview } from "@/app/dashboard/_actions/tenant/createReview";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ActiveReviewButton({ size = "sm" }: { size?: "sm" | "default" }) {
  return (
    <Button size={size} disabled>
      Leave Review
    </Button>
  );
}

type ReviewFormValues = {
  rating: number;
  comment: string;
};

const LeaveReviewDialog = ({ propertyId, propertyTitle, size = "sm" }: {
  propertyId: string;
  propertyTitle: string;
  size?: "sm" | "default";
}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    defaultValues: { rating: 0, comment: "" },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    const formData = new FormData();
    formData.set("rating", String(data.rating));
    formData.set("comment", data.comment);
    setError("");
    const result = await createReview(propertyId, formData);
    if (result.success) {
      toast.success(result.message);
      setSubmitted(true);
      setOpen(false);
    } else {
      setError(result.message);
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={size} disabled={submitted}>
          {submitted ? "Review Submitted" : "Leave Review"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review your rental</DialogTitle>
          <DialogDescription>Share your experience with {propertyTitle}.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label>Your rating</Label>
            <Controller
              name="rating"
              control={control}
              rules={{ min: { value: 1, message: "Choose a rating from 1 to 5 stars." } }}
              render={({ field }) => (
                <div className="flex gap-1" role="group" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-label={`${value} star${value > 1 ? "s" : ""}`}
                      aria-pressed={field.value === value}
                      onClick={() => field.onChange(value)}
                      className="rounded-md p-1 focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      <Star className={`size-7 ${value <= field.value ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.rating && <p role="alert" className="text-sm text-destructive">{errors.rating.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`review-comment-${propertyId}`}>Your comment (optional)</Label>
            <Textarea id={`review-comment-${propertyId}`} placeholder="What was your experience like?" {...register("comment")} />
          </div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveReviewDialog;
