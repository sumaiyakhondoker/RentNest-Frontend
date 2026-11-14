import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";
import { getMyRentalRequests, getRentalRequestById } from "@/app/dashboard/_actions/tenant/getMyRentalRequests";
import { getMyPayments } from "@/app/dashboard/_actions/tenant/getMyPayments";
import TenantDashboardHeader from "../shared/TenantDashboardHeader";
import TenantMetrics from "./TenantMetrics";
import RecentRentalRequests from "./RecentRentalRequests";
import RecentPayment from "./RecentPayment";
import RentalSteps from "./RentalSteps";

export default async function TenantDashboardContent() {
  const [profileResult, rentalsResult, paymentsResult] = await Promise.all([
    getMe(),
    getMyRentalRequests(),
    getMyPayments(),
  ]);
  const name = profileResult.success ? profileResult.data?.profile?.name || "Tenant" : "Tenant";
  const rentals = rentalsResult.success ? rentalsResult.data.allRentalRequests : null;
  const payments = paymentsResult.success ? paymentsResult.data : null;

  const recentRentals = [...(rentals || [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  const requestDetails = await Promise.all(recentRentals.map(async (rental) => {
    return (await getRentalRequestById(rental.id)) || rental;
  }));
  const recentPayment = [...(payments || [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] || null;
  let paymentProperty = requestDetails.find((rental) => rental.id === recentPayment?.rentalRequestId)?.property;
  if (recentPayment && !paymentProperty) {
    const paymentRequest = await getRentalRequestById(recentPayment.rentalRequestId);
    paymentProperty = paymentRequest?.property;
  }

  return (
    <div className="min-w-0 flex-1">
      <TenantDashboardHeader name={name} profileImage={profileResult.success ? profileResult.data?.profile?.profileImage : null} />
      <main className="mx-auto max-w-7xl space-y-8 px-5 py-7 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-wide text-primary">RENTAL OVERVIEW</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Welcome back, {name.split(" ")[0]}</h2>
            <p className="mt-2 text-sm text-muted-foreground">Here&apos;s a snapshot of your rental journey.</p>
          </div>
          <Button asChild className="h-11 rounded-lg px-5">
            <Link href="/properties">Browse properties</Link>
          </Button>
        </div>

        <TenantMetrics rentals={rentals} payments={payments} />
        <RecentRentalRequests rentals={requestDetails} hasError={!rentalsResult.success} />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
          <RecentPayment payment={recentPayment} property={paymentProperty} hasError={!paymentsResult.success} />
          <RentalSteps />
        </div>
      </main>
    </div>
  );
}
