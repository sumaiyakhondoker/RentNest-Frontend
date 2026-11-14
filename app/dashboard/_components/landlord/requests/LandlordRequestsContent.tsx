import { getMe } from "@/service/getMe";
import { getLandlordProperties } from "@/app/dashboard/_actions/landlord/getLandlordProperties";
import { getLandlordRequests } from "@/app/dashboard/_actions/landlord/getLandlordRequests";
import DashboardHeader from "@/app/dashboard/_components/shared/DashboardHeader";
import PendingRequestCard from "./PendingRequestCard";

export default async function LandlordRequestsContent() {
  const user = await getMe();
  const name = user.success ? user.data?.profile?.name || "Landlord" : "Landlord";
  const landlordId = user.success ? user.data?.profile?.id || "" : "";
  const [requestsResult, propertiesResult] = await Promise.all([
    getLandlordRequests(),
    getLandlordProperties(landlordId),
  ]);
  const pendingRequests = requestsResult.success
    ? requestsResult.data.allRentalRequests
        .filter((request) => request.status === "PENDING")
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];
  const properties = propertiesResult.success ? propertiesResult.data : [];

  return (
    <div className="min-w-0 flex-1">
      <DashboardHeader name={name} profileImage={user.success ? user.data?.profile?.profileImage : null} title="Rental requests" description="" accountLabel="LANDLORD" className="min-h-22" />
      <main className="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 lg:px-10">
        <div>
          <p className="text-xs font-bold tracking-wide text-primary">INCOMING INQUIRIES</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Rental requests</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Review pending rental requests and approve or reject each application.
          </p>
        </div>

        {!requestsResult.success ? (
          <p role="alert" className="rounded-xl border p-6 text-sm text-destructive">
            Could not load rental requests. Refresh to try again.
          </p>
        ) : pendingRequests.length === 0 ? (
          <p className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
            No pending rental requests.
          </p>
        ) : (
          <div className="space-y-5">
            {pendingRequests.map((request) => (
              <PendingRequestCard
                key={request.id}
                request={request}
                property={properties.find((property) => property.id === request.propertyId)}
              />
            ))}
          </div>
        )}
        <p className="text-sm text-muted-foreground">Only approved requests can proceed to Stripe payment.</p>
      </main>
    </div>
  );
}
