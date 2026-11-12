
import { z } from "zod";

const isFutureDate = (value: string) => {
  if (!value) return false;

  const date = new Date(`${value}T00:00:00`);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return !Number.isNaN(date.getTime()) && date > today;
};

export const rentalRequestSchema = z
  .object({
    moveInDate: z
      .string()
      .min(1, "Move-in date is required")
      .refine(isFutureDate, {
        message: "Move-in date must be in the future",
      }),

    leaseEndDate: z
      .string()
      .min(1, "Lease end date is required")
      .refine(isFutureDate, {
        message: "Lease end date must be in the future",
      }),

    message: z.string().trim().optional(),
  })
  .refine(
    (data) => data.leaseEndDate > data.moveInDate,
    {
      message: "Lease end date must be after move-in date",
      path: ["leaseEndDate"],
    }
  );

export type RentalRequestFormValues =
  z.infer<typeof rentalRequestSchema>;
