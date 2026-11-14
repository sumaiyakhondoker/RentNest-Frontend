"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type ActionResult = { success: boolean; message: string };

export async function saveLandlordProperty(
  mode: "create" | "edit",
  propertyId: string | undefined,
  _previousState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return { success: false, message: "Please log in first." };
  if (mode === "edit" && !propertyId) {
    return { success: false, message: "Property ID is missing." };
  }

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const picture = String(formData.get("picture") || "").trim();
  const price = Number(formData.get("price"));
  const availability = String(formData.get("availability") || "AVAILABLE");
  const categoryId = String(formData.get("categoryId") || "");
  const amenities = String(formData.get("amenities") || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!title || !description || !location || !Number.isInteger(price) || price <= 0) {
    return { success: false, message: "Enter a title, description, location and valid rent amount." };
  }
  if (amenities.length === 0) {
    return { success: false, message: "Add at least one amenity." };
  }
  if (!categoryId) {
    return { success: false, message: "Choose a property category." };
  }
  if (availability !== "AVAILABLE" && availability !== "RENTED") {
    return { success: false, message: "Choose a valid availability status." };
  }
  if (picture) {
    try {
      const imageUrl = new URL(picture);
      if (imageUrl.protocol !== "http:" && imageUrl.protocol !== "https:") {
        return { success: false, message: "Enter a valid image URL." };
      }
    } catch {
      return { success: false, message: "Enter a valid image URL." };
    }
  }

  const url = mode === "edit"
    ? `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`
    : `${process.env.BACKEND_API_URL}/api/landlord/properties`;

  try {
    const response = await fetch(url, {
      method: mode === "edit" ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        location,
        picture: picture || null,
        price,
        availability,
        amenities,
        categoryId,
      }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result.message || "Could not save this property." };
    }
  } catch {
    return { success: false, message: "Could not save this property. Please try again." };
  }

  revalidatePath("/dashboard/landlord");
  revalidatePath("/dashboard/landlord/properties");
  revalidatePath("/properties");
  if (propertyId) revalidatePath(`/properties/${propertyId}`);
  return {
    success: true,
    message: mode === "edit" ? "Property updated successfully." : "Property created successfully.",
  };
}
