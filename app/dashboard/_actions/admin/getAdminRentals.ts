import { cookies } from "next/headers";
import type { AdminRentalsResponse } from "@/lib/types";

export async function getAdminRentals(): Promise<AdminRentalsResponse> {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return { success: false, message: "Please log in first.", data: [] };

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const result: AdminRentalsResponse = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result.message || "Could not load rental requests.", data: [] };
    }
    return result;
  } catch {
    return { success: false, message: "Could not load rental requests.", data: [] };
  }
}
