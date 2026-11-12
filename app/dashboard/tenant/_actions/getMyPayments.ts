import { cookies } from "next/headers";
import type { PaymentsResponse } from "@/lib/types";

export async function getMyPayments(): Promise<PaymentsResponse> {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return { success: false, message: "Please log in first.", data: [] };
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
      headers: { Authorization: `Bearer ${token}` }, cache: "no-store",
    });
    const result: PaymentsResponse = await response.json();
    if (!response.ok) return { ...result, success: false };
    return result;
  } catch {
    return { success: false, message: "Could not load payments.", data: [] };
  }
}
