"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateAdminUserStatus(userId: string, accountStatus: "ACTIVE" | "BANNED") {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return { success: false, message: "Please log in first." };

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountStatus }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result.message || "Could not update this user." };
    }
  } catch {
    return { success: false, message: "Could not update this user. Please try again." };
  }

  revalidatePath("/dashboard/admin/users");
  revalidatePath("/dashboard/admin");
  return {
    success: true,
    message: accountStatus === "BANNED" ? "User banned successfully." : "User unbanned successfully.",
  };
}
