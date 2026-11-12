
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoaderCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  rentalRequestSchema,
  type RentalRequestFormValues,
} from "@/lib/validations/rental-request.schema";
import { createRentalRequest } from "@/app/(public)/_actions/createRentalRequest";

type Props = {
  propertyId: string;
};

export default function RentalRequestForm({ propertyId }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RentalRequestFormValues>({
    resolver: zodResolver(rentalRequestSchema),
    defaultValues: {
      moveInDate: "",
      leaseEndDate: "",
      message: "",
    },
  });

  const onSubmit = async (data: RentalRequestFormValues) => {
    const result = await createRentalRequest(propertyId, data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push("/dashboard/tenant");
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">
          Rental Request Form
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="moveInDate">
                Move-in Date *
              </Label>

              <Input
                id="moveInDate"
                type="date"
                className="h-11"
                aria-invalid={!!errors.moveInDate}
                {...register("moveInDate")}
              />

              {errors.moveInDate && (
                <p className="text-sm text-destructive">
                  {errors.moveInDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="leaseEndDate">
                Lease End Date *
              </Label>

              <Input
                id="leaseEndDate"
                type="date"
                className="h-11"
                aria-invalid={!!errors.leaseEndDate}
                {...register("leaseEndDate")}
              />

              {errors.leaseEndDate && (
                <p className="text-sm text-destructive">
                  {errors.leaseEndDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message (Optional)
            </Label>

            <Textarea
              id="message"
              rows={6}
              placeholder="Write a message to the landlord..."
              {...register("message")}
            />
          </div>

          <div className="flex justify-end pt-3">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Sending Request...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send Rental Request
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
