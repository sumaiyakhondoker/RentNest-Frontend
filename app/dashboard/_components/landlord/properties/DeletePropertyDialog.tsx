"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteLandlordProperty } from "@/app/dashboard/_actions/landlord/deleteLandlordProperty";

export default function DeletePropertyDialog({
  propertyId,
  propertyTitle,
}: {
  propertyId: string;
  propertyTitle: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteLandlordProperty(propertyId);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="rounded-lg">
          <Trash2 className="size-4" /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete property?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{propertyTitle}&quot;? This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={(event) => { event.preventDefault(); handleDelete(); }} disabled={pending}>
            {pending ? "Deleting..." : "Delete property"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
