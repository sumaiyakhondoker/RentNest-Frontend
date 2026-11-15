
# RentNest — Rental Property Management Platform

RentNest is a responsive rental property management application developed with **Next.js 16, React 19, TypeScript, Tailwind CSS 4, and shadcn/ui**.

The platform connects tenants and landlords, providing property listings, rental requests, payments, and role-based dashboards.

## Live Website

**Frontend:** https://rent-nest-frontend-nine.vercel.app

## Features

### Tenant
- Browse properties with search, filtering, sorting, and pagination.
- View property details, amenities, and customer reviews.
- Submit and track rental requests.
- Pay for approved requests through Stripe Checkout.
- View payment history and submit rental reviews.

### Landlord
- Create, edit, and delete property listings.
- Manage property availability.
- View incoming rental requests.
- Approve or reject rental applications.
- View property and rental request statistics.

### Admin
- View platform statistics.
- Manage users with search, filtering, and pagination.
- Ban or unban user accounts.
- Monitor properties and rental requests.
- View and create property categories.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui, Radix UI |
| Form Handling | React Hook Form |
| Validation | Zod |
| Authentication | JWT, HTTP-only Cookies |
| Notifications | Sonner |
| Icons | Lucide React |
| Package Manager | pnpm |
| Deployment | Vercel |

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sumaiyakhondoker/RentNest-Frontend.git
cd RentNest-Frontend
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the project root:

```env
BACKEND_API_URL=https://rent-nest-rose.vercel.app
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

Use the JWT signing secrets configured in the backend. Never commit actual secrets to GitHub.

### 4. Run the Development Server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Create production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Project Structure

```text
app/
├── (public)/          # Home, properties and public pages
├── auth/              # Login and registration
└── dashboard/         # Tenant, Landlord and Admin dashboards

components/            # Shared components and UI library
lib/                   # Types, utilities and validations
service/               # Authentication services
public/                # Static assets
proxy.ts               # Route protection
```

## Authentication & Authorization

- JWT authentication using HTTP-only cookies.
- Role-based access for Tenant, Landlord, and Admin.
- Protected dashboard routes using Next.js Proxy.
- Access token refresh support.

## API Integration

The frontend consumes the RentNest backend REST API built with **Node.js, Express.js, TypeScript, PostgreSQL, and Prisma**.

API calls are handled through Next.js Server Actions and server-side functions.

For detailed endpoint mappings, see [API_INTEGRATION.md](./API_INTEGRATION.md).

## Deployment

The frontend is deployed on **Vercel** and communicates with the deployed RentNest backend.

Production environment variables are configured in Vercel project settings.

## Project Links

- **Frontend Repository:** https://github.com/sumaiyakhondoker/RentNest-Frontend
- **Backend Repository:** https://github.com/sumaiyakhondoker/RentNest
- **Live Frontend:** https://rent-nest-frontend-nine.vercel.app
- **Live Backend:** https://rent-nest-rose.vercel.app

---

Developed by **Sumaiya Khondoker Nabila**.
