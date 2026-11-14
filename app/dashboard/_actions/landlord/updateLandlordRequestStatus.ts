"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateLandlordRequestStatus(
  requestId: string,
  status: "APPROVED" | "REJECTED",
) {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return { success: false, message: "Please log in first." };

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/requests/${requestId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      },
    );
    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result.message || "Could not update this request." };
    }
  } catch {
    return { success: false, message: "Could not update this request. Please try again." };
  }

  revalidatePath("/dashboard/landlord");
  revalidatePath("/dashboard/landlord/requests");
  return {
    success: true,
    message: status === "APPROVED" ? "Request approved." : "Request rejected.",
  };
}
