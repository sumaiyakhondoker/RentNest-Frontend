import { cookies } from "next/headers";
import type { AdminPropertiesResponse } from "@/lib/types";

export async function getAdminProperties(): Promise<AdminPropertiesResponse> {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return { success: false, message: "Please log in first.", data: [] };

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/admin/properties`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const result: AdminPropertiesResponse = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result.message || "Could not load properties.", data: [] };
    }
    return result;
  } catch {
    return { success: false, message: "Could not load properties.", data: [] };
  }
}
