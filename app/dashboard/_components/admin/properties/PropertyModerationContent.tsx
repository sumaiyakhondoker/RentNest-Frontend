import { getAdminProperties } from "@/app/dashboard/_actions/admin/getAdminProperties";
import { getAdminUsers } from "@/app/dashboard/_actions/admin/getAdminUsers";
import PropertyModerationTable from "./PropertyModerationTable";

export default async function PropertyModerationContent() {
  const [propertiesResult, usersResult] = await Promise.all([
    getAdminProperties(),
    getAdminUsers(),
  ]);

  return (
    <div className="min-w-0 flex-1">
      <main className="mx-auto max-w-7xl space-y-6 px-5 py-7 sm:px-8 lg:px-10">
        <div>
          <p className="text-xs font-bold tracking-wide text-primary">LISTING OVERSIGHT</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">All property listings</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Inspect property availability, landlord details and monthly rent.
          </p>
        </div>
        <PropertyModerationTable
          properties={propertiesResult.success ? propertiesResult.data : []}
          users={usersResult.success ? usersResult.data.allUsers : []}
          hasError={!propertiesResult.success}
        />
      </main>
    </div>
  );
}
