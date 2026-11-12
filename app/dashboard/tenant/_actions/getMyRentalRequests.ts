import { cookies } from "next/headers";
import type { RentalRequest, RentalRequestsResponse } from "@/lib/types";

export async function getMyRentalRequests(): Promise<RentalRequestsResponse> {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return { success: false, message: "Please log in first.", data: { totalRentalRequests: 0, allRentalRequests: [] } };
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      headers: { Authorization: `Bearer ${token}` }, cache: "no-store",
    });
    const result: RentalRequestsResponse = await response.json();
    if (!response.ok) return { ...result, success: false };
    return result;
  } catch {
    return { success: false, message: "Could not load rental requests.", data: { totalRentalRequests: 0, allRentalRequests: [] } };
  }
}

export async function getRentalRequestById(id: string): Promise<RentalRequest | null> {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return null;
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${id}`, {
      headers: { Authorization: `Bearer ${token}` }, cache: "no-store",
    });
    const result: { success: boolean; data?: RentalRequest } = await response.json();
    return response.ok && result.success ? result.data ?? null : null;
  } catch {
    return null;
  }
}
