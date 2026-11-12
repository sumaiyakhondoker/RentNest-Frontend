
"use server";

import { cookies } from "next/headers";
import { rentalRequestSchema } from "@/lib/validations/rental-request.schema";
import type { RentalRequestFormValues } from "@/lib/validations/rental-request.schema";

export const createRentalRequest = async (
  propertyId: string,
  data: RentalRequestFormValues
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Please login first",
    };
  }

  const validation = rentalRequestSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      message: "Please provide valid rental dates",
    };
  }

  if (!/^[0-9a-f-]{36}$/i.test(propertyId)) {
    return {
      success: false,
      message: "Invalid property ID",
    };
  }

  const payload = {
    propertyId,
    ...validation.data,
  };

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/rentals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message || "Failed to create rental request",
      };
    }

    return {
      success: true,
      message: result.message,
    };
  } catch {
    return {
      success: false,
      message: "Unable to connect to the server",
    };
  }
};
