import { getAllCategories } from "@/app/(public)/_actions/getProperties";
import { getAdminUsers } from "@/app/dashboard/_actions/admin/getAdminUsers";
import { getAdminProperties } from "@/app/dashboard/_actions/admin/getAdminProperties";
import { getAdminRentals } from "@/app/dashboard/_actions/admin/getAdminRentals";
import AdminMetrics from "./AdminMetrics";
import AdminActivity from "./AdminActivity";

const AdminDashboardContent = async () => {
  const [usersResult, propertiesResult, rentalsResult, categories] = await Promise.all([
    getAdminUsers(),
    getAdminProperties(),
    getAdminRentals(),
    getAllCategories().catch(() => null),
  ]);
  const users = usersResult.success ? usersResult.data.allUsers : [];
  const properties = propertiesResult.success ? propertiesResult.data : [];
  const rentals = rentalsResult.success ? rentalsResult.data : [];

  return (
    <div className="min-w-0 flex-1">
      <main className="mx-auto max-w-7xl space-y-6 px-5 py-7 sm:px-8 lg:px-10">
        <div>
          <p className="text-xs font-bold tracking-wide text-primary">PLATFORM OVERVIEW</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Welcome to RentNest Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Monitor user accounts, properties and rental activity.
          </p>
        </div>

        <AdminMetrics
          users={usersResult.success ? usersResult.data.totalUsers : null}
          properties={propertiesResult.success ? properties.length : null}
          rentals={rentalsResult.success ? rentals.length : null}
          categories={categories?.length ?? null}
        />
        <AdminActivity
          users={users}
          properties={properties}
          rentals={rentals}
          hasError={!usersResult.success || !propertiesResult.success || !rentalsResult.success}
        />
      </main>
    </div>
  );
};

export default AdminDashboardContent;
