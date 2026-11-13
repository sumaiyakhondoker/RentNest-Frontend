import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";
import { getLandlordProperties } from "@/app/dashboard/_actions/landlord/getLandlordProperties";
import { getLandlordRequests } from "@/app/dashboard/_actions/landlord/getLandlordRequests";
import DashboardHeader from "@/app/dashboard/_components/shared/DashboardHeader";
import LandlordMetrics from "./LandlordMetrics";
import RecentLandlordProperties from "./RecentLandlordProperties";
import IncomingLandlordRequests from "./IncomingLandlordRequests";

export default async function LandlordDashboardContent() {
  const user = await getMe();
  const name = user.success ? user.data?.profile?.name || "Landlord" : "Landlord";
  const landlordId = user.success ? user.data?.profile?.id || "" : "";
  const [propertiesResult, requestsResult] = await Promise.all([
    getLandlordProperties(landlordId),
    getLandlordRequests(),
  ]);

  const properties = propertiesResult.success ? propertiesResult.data : null;
  const requests = requestsResult.success ? requestsResult.data.allRentalRequests : null;
  const recentProperties = [...(properties || [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  const recentRequests = [...(requests || [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 2);

  return (
    <div className="min-w-0 flex-1">
      <DashboardHeader
        name={name}
        title="Landlord overview"
        description="Manage your rentals in one place"
        accountLabel="LANDLORD ACCOUNT"
        className="min-h-22"
      />
      <main className="mx-auto max-w-7xl space-y-6 px-5 py-7 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-wide text-primary">PORTFOLIO OVERVIEW</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Welcome back, {name.split(" ")[0]}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep track of your properties and rental requests.
            </p>
          </div>
          <Button disabled title="Create property page is coming soon" className="h-11 rounded-lg px-5">
            <Plus className="size-4" /> Add property
          </Button>
        </div>

        <LandlordMetrics properties={properties} requests={requests} />
        <RecentLandlordProperties properties={recentProperties} hasError={!propertiesResult.success} />
        <IncomingLandlordRequests
          requests={recentRequests}
          properties={properties || []}
          hasError={!requestsResult.success}
        />
      </main>
    </div>
  );
}
