"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createAdminCategory(formData: FormData) {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return { success: false, message: "Please log in first." };

  const categoryName = String(formData.get("categoryName") || "").trim();
  const description = String(formData.get("description") || "").trim();
  if (!categoryName || !description) {
    return { success: false, message: "Enter a category name and description." };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName, description }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result.message || "Could not create this category." };
    }
  } catch {
    return { success: false, message: "Could not create this category. Please try again." };
  }

  revalidatePath("/dashboard/admin/categories");
  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/landlord/properties");
  revalidatePath("/properties");
  revalidatePath("/");
  return { success: true, message: "Category created successfully." };
}
