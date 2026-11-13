import { cookies } from "next/headers";
import type { LandlordRequestsResponse } from "@/lib/types";

export async function getLandlordRequests(): Promise<LandlordRequestsResponse> {
  const token = (await cookies()).get("accessToken")?.value;
  const emptyData = { totalRentalRequests: 0, allRentalRequests: [] };

  if (!token) {
    return { success: false, message: "Please log in first.", data: emptyData };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const result: LandlordRequestsResponse = await response.json();

    if (!response.ok || !result.success) {
      return { success: false, message: result.message, data: emptyData };
    }

    return result;
  } catch {
    return { success: false, message: "Could not load rental requests.", data: emptyData };
  }
}
