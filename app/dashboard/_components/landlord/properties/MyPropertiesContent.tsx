import { getMe } from "@/service/getMe";
import { getAllCategories } from "@/app/(public)/_actions/getProperties";
import { getLandlordProperties } from "@/app/dashboard/_actions/landlord/getLandlordProperties";
import DashboardHeader from "@/app/dashboard/_components/shared/DashboardHeader";
import PropertyCard from "./PropertyCard";
import PropertyFormDialog from "./PropertyFormDialog";

export default async function MyPropertiesContent({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; create?: string }>;
}) {
  const query = await searchParams;
  const user = await getMe();
  const name = user.success ? user.data?.profile?.name || "Landlord" : "Landlord";
  const landlordId = user.success ? user.data?.profile?.id || "" : "";
  const [result, categories] = await Promise.all([
    getLandlordProperties(landlordId),
    getAllCategories().catch(() => []),
  ]);
  const properties = result.success
    ? [...result.data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  return (
    <div className="min-w-0 flex-1">
      <DashboardHeader
        name={name}
        profileImage={user.success ? user.data?.profile?.profileImage : null}
        title="My properties"
        description=""
        accountLabel="LANDLORD"
        className="min-h-22"
      />
      <main className="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-wide text-primary">PROPERTY MANAGEMENT</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Your property listings</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Create and manage the properties in your portfolio.
            </p>
          </div>
          <PropertyFormDialog categories={categories} openOnLoad={query.create === "1"} />
        </div>

        {!result.success ? (
          <p role="alert" className="rounded-xl border p-6 text-sm text-destructive">
            Could not load your properties. Refresh to try again.
          </p>
        ) : properties.length === 0 ? (
          <p className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
            You have no properties yet. Use Create listing to add one.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                categories={categories}
                openEdit={query.edit === property.id}
              />
            ))}
          </div>
        )}
        {result.success && (
          <p className="text-sm text-muted-foreground">
            Showing {properties.length} {properties.length === 1 ? "property" : "properties"} in your portfolio.
          </p>
        )}
      </main>
    </div>
  );
}
