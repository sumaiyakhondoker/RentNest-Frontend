import { cookies } from "next/headers";
import type { MyProfileResponse } from "@/lib/types";

export async function getMyProfile(): Promise<MyProfileResponse> {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Please log in first." };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const result: MyProfileResponse = await response.json();

    if (!response.ok) {
      return { ...result, success: false };
    }

    return result;
  } catch {
    return { success: false, message: "Could not load your profile." };
  }
}
