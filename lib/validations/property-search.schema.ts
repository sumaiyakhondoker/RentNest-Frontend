
import { z } from "zod";

const rentAmount = z.string().refine(
  (value) => value === "" || (/^\d+$/.test(value) && Number.isSafeInteger(Number(value))),
  "Enter a valid rent amount",
);

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
  minPrice: rentAmount,
  maxPrice: rentAmount,
}).refine(
  ({ minPrice, maxPrice }) => !minPrice || !maxPrice || Number(minPrice) <= Number(maxPrice),
  { path: ["maxPrice"], message: "Maximum rent must be at least the minimum rent" },
);

export type PropertySearchFormValues = z.infer<
  typeof propertySearchSchema
>;
