import type { PropertyDetailsResponse } from "@/lib/types";



export const getPropertyDetails = async (
  id: string
)=> {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    {
      cache: "no-cache",
    }
  );

  const result= await res.json();

  return result;
};