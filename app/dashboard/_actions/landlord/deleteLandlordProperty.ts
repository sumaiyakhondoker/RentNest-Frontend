"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteLandlordProperty(propertyId: string) {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return { success: false, message: "Please log in first." };

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result.message || "Could not delete this property." };
    }
  } catch {
    return { success: false, message: "Could not delete this property. Please try again." };
  }

  revalidatePath("/dashboard/landlord");
  revalidatePath("/dashboard/landlord/properties");
  revalidatePath("/properties");
  revalidatePath(`/properties/${propertyId}`);
  return { success: true, message: "Property deleted successfully." };
}
