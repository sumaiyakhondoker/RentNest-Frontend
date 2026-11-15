"use client";

import { useState, useTransition, type FormEvent } from "react";
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

export function ActiveReviewButton() {
  return (
    <Button size="sm" disabled>
      Leave Review
    </Button>
  );
}

export default function LeaveReviewDialog({ propertyId, propertyTitle }: {
  propertyId: string;
  propertyTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rating === 0) {
      setError("Choose a rating from 1 to 5 stars.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    formData.set("rating", String(rating));
    setError("");
    startTransition(async () => {
      const result = await createReview(propertyId, formData);
      if (result.success) {
        toast.success(result.message);
        setSubmitted(true);
        setOpen(false);
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" disabled={submitted}>
          {submitted ? "Review Submitted" : "Leave Review"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Review your rental</DialogTitle>
          <DialogDescription>Share your experience with {propertyTitle}.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Your rating</Label>
            <div className="flex gap-1" role="group" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                  aria-pressed={rating === value}
                  onClick={() => setRating(value)}
                  className="rounded-md p-1 focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <Star className={`size-7 ${value <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`review-comment-${propertyId}`}>Your comment (optional)</Label>
            <Textarea id={`review-comment-${propertyId}`} name="comment" placeholder="What was your experience like?" />
          </div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
