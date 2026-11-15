import type { PropertyListResponse } from "@/lib/types";
// get 6 property for home page
export const getHomeProperties = async () => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?limit=6&page=1`,
    { cache: "no-store" },
  );

  const result = await res.json();
  return result;
};









export type PropertiesQuery = {
  search?: string;
  location?: string;
  category?: string;
  amenities?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
};

export type Category = {
  id: string;
  categoryName: string;
  description: string;
};

type CategoriesResponse = {
  success: boolean;
  data: {
    totalCategories: number;
    allCategoriesDetails: Category[];
  };
};

export const  getAllProperties = async(
  query: PropertiesQuery = {},
): Promise<PropertyListResponse> => {
  const params = new URLSearchParams({
    page: query.page || "1",
    limit: query.limit || "6",
    sortBy: query.sortBy || "createdAt",
    sortOrder: query.sortOrder || "desc",
  });

  if (query.location) {
    params.set("location", query.location);
  }

  if (query.search) {
    params.set("search", query.search);
  }

  if (query.amenities) {
    params.set("amenities", query.amenities);
  }

  if (query.category && query.category !== "all") {
    params.set("category", query.category);
  }

  if (query.minPrice) {
    params.set("minPrice", query.minPrice);
  }

  if (query.maxPrice) {
    params.set("maxPrice", query.maxPrice);
  }

  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  const result: PropertyListResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
}

export async function getAllCategories(): Promise<Category[]> {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result: CategoriesResponse = await response.json();

  if (!result.success) {
    throw new Error("Failed to fetch categories");
  }

  return result.data.allCategoriesDetails;
}
