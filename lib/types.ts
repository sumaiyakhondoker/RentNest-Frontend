
export type Property = {
  id: string;
  title: string;
  description: string;
  picture: string | null;
  location: string;
  price: number;
  amenities: string[];
  availability: "AVAILABLE" | "RENTED";
  landlordId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type PropertyListResponse = {
  success: boolean;
  message: string;
  data: {
    allProperties: Property[];
    meta: {
      page: number;
      limit: number;
      totalProperties: number;
      totalPages: number;
    };
  };
};
