
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

export type RentalRequest = {
  id: string;
  propertyId: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
  moveInDate?: string | null;
  leaseEndDate?: string | null;
  message?: string | null;
  createdAt: string;
  property?: Property;
};

export type RentalRequestsResponse = {
  success: boolean;
  message: string;
  data: { totalRentalRequests: number; allRentalRequests: RentalRequest[] };
};

export type LandlordRentalRequest = RentalRequest & {
  tenantId: string;
  tenant?: { name: string };
};

export type LandlordRequestsResponse = {
  success: boolean;
  message: string;
  data: {
    totalRentalRequests: number;
    allRentalRequests: LandlordRentalRequest[];
  };
};

export type LandlordPropertiesResponse = {
  success: boolean;
  message: string;
  data: Property[];
};

export type Payment = {
  id: string;
  rentalRequestId: string;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  provider: string;
  createdAt: string;
};

export type PaymentsResponse = {
  success: boolean;
  message: string;
  data: Payment[];
};

export type PaymentDetails = Payment & {
  transactionId: string | null;
  paidAt: string | null;
  rentalRequest?: RentalRequest | null;
};

export type PaymentDetailsResponse = {
  success: boolean;
  message: string;
  data?: PaymentDetails;
};

export type CreatePaymentResponse = {
  success: boolean;
  message?: string;
  data?: { checkoutUrl?: string | null };
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  accountStatus: "ACTIVE" | "BANNED";
  profileImage: string | null;
  createdAt: string;
};

export type MyProfileResponse = {
  success: boolean;
  message: string;
  data?: { profile: UserProfile };
};

export type AdminUsersResponse = {
  success: boolean;
  message: string;
  data: { totalUsers: number; allUsers: UserProfile[] };
};

export type AdminPropertiesResponse = {
  success: boolean;
  message: string;
  data: Property[];
};

export type AdminRentalsResponse = {
  success: boolean;
  message: string;
  data: (RentalRequest & { tenantId: string })[];
};

