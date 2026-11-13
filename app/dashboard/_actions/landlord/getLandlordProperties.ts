import { getAllProperties } from "@/app/(public)/_actions/getProperties";
import type { LandlordPropertiesResponse, Property } from "@/lib/types";

export async function getLandlordProperties(
  landlordId: string,
): Promise<LandlordPropertiesResponse> {
  if (!landlordId) {
    return { success: false, message: "Landlord account not found.", data: [] };
  }

  try {
    const firstPage = await getAllProperties({ page: "1", limit: "100" });
    const allProperties: Property[] = [...firstPage.data.allProperties];

    for (let page = 2; page <= firstPage.data.meta.totalPages; page++) {
      const result = await getAllProperties({ page: String(page), limit: "100" });
      allProperties.push(...result.data.allProperties);
    }

    return {
      success: true,
      message: "Properties loaded.",
      data: allProperties.filter((property) => property.landlordId === landlordId),
    };
  } catch {
    return { success: false, message: "Could not load your properties.", data: [] };
  }
}
