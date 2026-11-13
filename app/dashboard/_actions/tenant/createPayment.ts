"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { CreatePaymentResponse } from "@/lib/types";

export async function createPayment(rentalRequestId: string) {
  const token = (await cookies()).get("accessToken")?.value;
  const errorPage = `/dashboard/tenant/requests/${rentalRequestId}/pay`;

  if (!token) {
    redirect(`${errorPage}?error=Please%20log%20in%20first.`);
  }

  let checkoutUrl: string | null = null;
  let errorMessage = "Could not start payment. Please try again.";

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rentalRequestId }),
      cache: "no-store",
    });

    const result: CreatePaymentResponse = await response.json();

    if (response.ok && result.success && result.data?.checkoutUrl) {
      checkoutUrl = result.data.checkoutUrl;
    } else {
      errorMessage = result.message || errorMessage;
    }
  } catch {
    errorMessage = "Could not connect to the payment server. Please try again.";
  }

  if (checkoutUrl) {
    redirect(checkoutUrl);
  }

  redirect(`${errorPage}?error=${encodeURIComponent(errorMessage)}`);
}
