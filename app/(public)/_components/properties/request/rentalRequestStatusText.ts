import type { RentalRequest } from "@/lib/types";

export const rentalRequestStatusText: Record<
  RentalRequest["status"],
  { title: string; description: string }
> = {
  PENDING: {
    title: "Request pending",
    description: "Your request is waiting for the landlord's decision.",
  },
  APPROVED: {
    title: "Request approved",
    description: "Your rental request for this property was approved.",
  },
  REJECTED: {
    title: "Request rejected",
    description: "Your rental request for this property was rejected.",
  },
  ACTIVE: {
    title: "Currently renting",
    description: "You're currently renting this property.",
  },
  COMPLETED: {
    title: "Rental completed",
    description: "You've already rented this property.",
  },
};
