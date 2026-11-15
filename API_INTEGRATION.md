
# RentNest — API Integration

RentNest is a Next.js frontend integrated with an Express.js REST API. The application supports Tenant, Landlord, and Admin roles.

## API Configuration

Backend requests are handled using Next.js Server Actions and server-side functions.

```env
BACKEND_API_URL=https://rent-nest-rose.vercel.app
```

The backend URL is accessed through `process.env.BACKEND_API_URL`.

## API Endpoint Mapping

The following mappings are based on the actual frontend components, Server Actions, and backend routes.

### 1. Authentication

| Frontend Component / Service | Server Action / Function | Method | Backend Endpoint |
|---|---|---|---|
| `LoginForm.tsx` | `loginAction` | POST | `/api/auth/login` |
| `RegisterForm.tsx` | `registerAction` | POST | `/api/auth/register` |
| Profile Pages | `getMyProfile` / `getMe` | GET | `/api/auth/me` |
| `service/refreshToken.ts` | `getNewAccessToken` | POST | `/api/auth/refresh-token` |

### 2. Public Properties

| Frontend Component / Page | Server Action / Function | Method | Backend Endpoint |
|---|---|---|---|
| `PropertiesSection.tsx` | `getHomeProperties` | GET | `/api/properties` |
| `AllPropertiesList.tsx` | `getAllProperties` | GET | `/api/properties` |
| `PropertySearchBar.tsx` | `getAllProperties` | GET | `/api/properties` |
| `PropertyFilter.tsx` | `getAllProperties` | GET | `/api/properties` |
| `CategoryList.tsx` | `getAllCategories` | GET | `/api/categories` |
| `properties/[id]/page.tsx` | `getPropertyDetails` | GET | `/api/properties/:id` |

Property listings support search, location, category, amenities, price range, sorting, and pagination through query parameters.

### 3. Tenant

| Frontend Component / Page | Server Action / Function | Method | Backend Endpoint |
|---|---|---|---|
| `RentalRequestForm.tsx` | `createRentalRequest` | POST | `/api/rentals` |
| `MyRentalRequestsList.tsx` | `getMyRentalRequests` | GET | `/api/rentals` |
| `RentalRequestDetails.tsx` | `getRentalRequestById` | GET | `/api/rentals/:id` |
| `requests/[id]/pay/page.tsx` | `createPayment` | POST | `/api/payments/create` |
| `PaymentHistoryList.tsx` | `getMyPayments` | GET | `/api/payments` |
| `PaymentSuccessCard.tsx` | `getPaymentById` | GET | `/api/payments/:id` |
| `LeaveReviewDialog.tsx` | `createReview` | POST | `/api/reviews` |

### 4. Landlord

| Frontend Component / Page | Server Action / Function | Method | Backend Endpoint |
|---|---|---|---|
| `MyPropertiesContent.tsx` | `getLandlordProperties` | GET | `/api/landlord/properties` |
| `PropertyFormDialog.tsx` | `saveLandlordProperty` | POST | `/api/landlord/properties` |
| `PropertyFormDialog.tsx` | `saveLandlordProperty` | PUT | `/api/landlord/properties/:id` |
| `DeletePropertyDialog.tsx` | `deleteLandlordProperty` | DELETE | `/api/landlord/properties/:id` |
| `LandlordRequestsContent.tsx` | `getLandlordRequests` | GET | `/api/landlord/requests` |
| `RequestActions.tsx` | `updateLandlordRequestStatus` | PATCH | `/api/landlord/requests/:id` |

The dedicated Landlord API module supports property CRUD operations and rental request approval/rejection.

### 5. Admin

| Frontend Component / Page | Server Action / Function | Method | Backend Endpoint |
|---|---|---|---|
| `UserManagementContent.tsx` | `getAdminUsers` | GET | `/api/admin/users` |
| `UserStatusButton.tsx` | `updateAdminUserStatus` | PATCH | `/api/admin/users/:id` |
| `PropertyModerationContent.tsx` | `getAdminProperties` | GET | `/api/admin/properties` |
| `AdminRequestsContent.tsx` | `getAdminRentals` | GET | `/api/admin/rentals` |
| `AdminCategoriesContent.tsx` | `getAllCategories` | GET | `/api/categories` |
| `CategoryForm.tsx` | `createAdminCategory` | POST | `/api/categories` |

## Authentication & Authorization

- JWT-based authentication with HTTP-only cookies.
- Next.js `proxy.ts` handles frontend route protection.
- Role-based dashboard access for Tenant, Landlord, and Admin.
- Protected backend requests include an access token in the Authorization header.
- Access token refresh is handled through the backend refresh-token endpoint.

## Payment Integration

The Tenant initiates payment through `POST /api/payments/create`. The backend returns a Stripe Checkout URL, and the frontend redirects the user to checkout.

The backend handles payment confirmation through `POST /api/payments/confirm`.

Payment outcome pages:

- `/payment/success`
- `/payment/cancel`

## Error Handling

- React Hook Form and Zod for form validation.
- Sonner toast notifications for API success and failure.
- Loading skeletons and error boundaries.
- Server-side handling of backend API responses.

## Project Links

- **Frontend:** https://github.com/sumaiyakhondoker/RentNest-Frontend
- **Backend:** https://github.com/sumaiyakhondoker/RentNest
- **Live Website:** https://rent-nest-frontend-nine.vercel.app

---

This document maps RentNest frontend components and Server Actions to the corresponding backend REST API endpoints.
