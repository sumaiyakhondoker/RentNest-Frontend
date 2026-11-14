import { getMe } from "@/service/getMe";
import { getLandlordRequests } from "@/app/dashboard/_actions/landlord/getLandlordRequests";
import { getLandlordProperties } from "@/app/dashboard/_actions/landlord/getLandlordProperties";
import DashboardHeader from "@/app/dashboard/_components/shared/DashboardHeader";
import RentalHistoryCard from "./RentalHistoryCard";

export default async function LandlordHistoryContent() {
  const user = await getMe();
  const name = user.success ? user.data?.profile?.name || "Landlord" : "Landlord";
  const landlordId = user.success ? user.data?.profile?.id || "" : "";
  const [requestsResult, propertiesResult] = await Promise.all([
    getLandlordRequests(),
    getLandlordProperties(landlordId),
  ]);
  const history = requestsResult.success
    ? requestsResult.data.allRentalRequests
        .filter((request) => request.status !== "PENDING")
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];
  const properties = propertiesResult.success ? propertiesResult.data : [];

  return (
    <div className="min-w-0 flex-1">
      <DashboardHeader
        name={name}
        profileImage={user.success ? user.data?.profile?.profileImage : null}
        title="Rental history"
        description=""
        accountLabel="LANDLORD"
        className="min-h-22"
      />
      <main className="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 lg:px-10">
        <div>
          <p className="text-xs font-bold tracking-wide text-primary">RENTAL RECORDS</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Rental history</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            See approved, rejected, active and completed rental requests.
          </p>
        </div>

        {!requestsResult.success ? (
          <p role="alert" className="rounded-xl border p-6 text-sm text-destructive">
            Could not load rental history. Refresh to try again.
          </p>
        ) : history.length === 0 ? (
          <p className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
            No rental history yet.
          </p>
        ) : (
          <div className="space-y-5">
            {history.map((request) => (
              <RentalHistoryCard
                key={request.id}
                request={request}
                property={properties.find((property) => property.id === request.propertyId)}
              />
            ))}
          </div>
        )}
        {requestsResult.success && (
          <p className="text-sm text-muted-foreground">
            Showing {history.length} {history.length === 1 ? "rental record" : "rental records"}.
          </p>
          
        )}
      </main>
    </div>
  );
}
