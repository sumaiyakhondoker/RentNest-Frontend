import type { PropertyDetailsResponse } from "@/lib/types";

export const getPropertyDetails = async (
  id: string
): Promise<PropertyDetailsResponse> => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    {
      cache: "no-store",
    }
  );

  const result: PropertyDetailsResponse = await res.json();

  return result;
};