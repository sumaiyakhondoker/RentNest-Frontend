import { cookies } from "next/headers";
import type { AdminUsersResponse } from "@/lib/types";

export async function getAdminUsers(): Promise<AdminUsersResponse> {
  const token = (await cookies()).get("accessToken")?.value;
  const emptyData = { totalUsers: 0, allUsers: [] };
  if (!token) return { success: false, message: "Please log in first.", data: emptyData };

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const result: AdminUsersResponse = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result.message || "Could not load users.", data: emptyData };
    }
    return result;
  } catch {
    return { success: false, message: "Could not load users.", data: emptyData };
  }
}
