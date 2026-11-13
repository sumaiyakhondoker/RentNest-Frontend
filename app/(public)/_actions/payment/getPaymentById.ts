import { cookies } from "next/headers";
import type { PaymentDetailsResponse } from "@/lib/types";

export async function getPaymentById(id: string): Promise<PaymentDetailsResponse> {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Please log in to view this payment." };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/payments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const result: PaymentDetailsResponse = await response.json();

    if (!response.ok) return { ...result, success: false };
    return result;
  } catch {
    return { success: false, message: "Could not load payment details." };
  }
}
