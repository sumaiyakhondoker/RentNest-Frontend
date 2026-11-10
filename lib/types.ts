
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



export type Review = {
  id: string;
  tenantId: string;
  propertyId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PropertyDetails = Property & {
  reviews: Review[];
};

export type PropertyDetailsResponse = {
  success: boolean;
  message: string;
  data: PropertyDetails;
};

