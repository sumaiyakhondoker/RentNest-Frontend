// src/services/property.service.ts ---->     file name according to chatgpt. 

import { PropertyListResponse } from "@/lib/types";



const API_BASE_URL = process.env.API_BASE_URL;

export async function getProperties(limit = 6) {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not configured");
  }

  const response = await fetch(
    `${API_BASE_URL}/properties?limit=${limit}&page=1`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  const result: PropertyListResponse =
    await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.data.allProperties;
}
