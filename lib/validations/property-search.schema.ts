
import { z } from "zod";

export const propertySearchSchema = z.object({
  search: z.string().trim().max(100, {
    message: "Search must be within 100 characters",
  }),
  location: z.string().trim().max(100, {
    message: "Location must be within 100 characters",
  }),
  amenities: z.string().trim().max(200, {
    message: "Amenities must be within 200 characters",
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
