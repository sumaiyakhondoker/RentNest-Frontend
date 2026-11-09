"use server";

export type RegisterActionState = {
  success: boolean;
  message: string;
};

type RegisterApiResponse = {
  success?: boolean;
  message?: string;
};

export async function registerAction(
  _previousState: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const nameValue = formData.get("name");
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const phoneValue = formData.get("phone");
  const roleValue = formData.get("role");

  const name = typeof nameValue === "string" ? nameValue.trim() : "";
  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";
  const phone = typeof phoneValue === "string" ? phoneValue.trim() : "";
  const role = typeof roleValue === "string" ? roleValue : "";

  if (!name || name.length < 3) {
    return { success: false, message: "Name must be at least 3 characters." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  if (password.length < 7) {
    return {
      success: false,
      message: "Password must be at least 7 characters.",
    };
  }

  if (phone && phone.length !== 11) {
    return {
      success: false,
      message: "Phone number must contain 11 characters.",
    };
  }

  if (role !== "TENANT" && role !== "LANDLORD") {
    return { success: false, message: "Please choose a valid account role." };
  }

  const backendUrl = process.env.BACKEND_API_URL?.replace(/\/+$/, "");

  if (!backendUrl) {
    return {
      success: false,
      message: "BACKEND_API_URL is not configured.",
    };
  }

  let response: Response;

  try {
    response = await fetch(`${backendUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
        ...(phone ? { phone } : {}),
      }),
      cache: "no-store",
    });
  } catch {
    return {
      success: false,
      message: "Could not connect to the backend. Please try again.",
    };
  }

  let result: RegisterApiResponse;

  try {
    result = (await response.json()) as RegisterApiResponse;
  } catch {
    return {
      success: false,
      message: "The backend returned an invalid response.",
    };
  }

  if (!response.ok || !result.success) {
    return {
      success: false,
      message:
        typeof result.message === "string"
          ? result.message
          : "Registration failed. Please try again.",
    };
  }

  return {
    success: true,
    message: result.message ?? "Account created successfully.",
  };
}