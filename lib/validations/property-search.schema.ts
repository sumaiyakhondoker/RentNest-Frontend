
import { z } from "zod";

export const propertySearchSchema = z.object({
  location: z.string().trim().max(100, {
    message: "Location must be within 100 characters",
  }),
  category: z.string().min(1, "Select a property type"),
  priceRange: z.enum([
    "all",
    "under-10000",
    "10000-20000",
    "20000-40000",
    "above-40000",
  ]),
});

export type PropertySearchFormValues = z.infer<
  typeof propertySearchSchema
>;
