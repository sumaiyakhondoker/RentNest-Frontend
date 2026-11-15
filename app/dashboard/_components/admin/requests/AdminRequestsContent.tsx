import { getAdminRentals } from "@/app/dashboard/_actions/admin/getAdminRentals";
import { getAdminProperties } from "@/app/dashboard/_actions/admin/getAdminProperties";
import { getAdminUsers } from "@/app/dashboard/_actions/admin/getAdminUsers";
import AdminRequestsTable from "./AdminRequestsTable";

const AdminRequestsContent = async () => {
  const [rentalsResult, propertiesResult, usersResult] = await Promise.all([
    getAdminRentals(),
    getAdminProperties(),
    getAdminUsers(),
  ]);
  const requests = rentalsResult.success
    ? [...rentalsResult.data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-5 py-7 sm:px-8 lg:px-10">
      <div>
        <p className="text-xs font-bold tracking-wide text-primary">RENTAL ACTIVITY</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">All rental requests</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          View requests from tenants across the platform.
        </p>
      </div>
      <AdminRequestsTable
        requests={requests}
        properties={propertiesResult.success ? propertiesResult.data : []}
        users={usersResult.success ? usersResult.data.allUsers : []}
        hasError={!rentalsResult.success}
      />
    </main>
  );
};

export default AdminRequestsContent;
