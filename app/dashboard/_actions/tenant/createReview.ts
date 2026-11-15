"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createReview(propertyId: string, formData: FormData) {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return { success: false, message: "Please log in first." };

  const rating = Number(formData.get("rating"));
  const comment = String(formData.get("comment") || "").trim();
  if (!propertyId || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { success: false, message: "Choose a rating from 1 to 5 stars." };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propertyId, rating, comment }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result.message || "Could not save your review." };
    }
  } catch {
    return { success: false, message: "Could not save your review. Please try again." };
  }

  revalidatePath(`/properties/${propertyId}`);
  return { success: true, message: "Review submitted successfully." };
}
