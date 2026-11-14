import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMe } from "@/service/getMe";
import { createPayment } from "@/app/dashboard/_actions/tenant/createPayment";
import { getRentalRequestById } from "@/app/dashboard/_actions/tenant/getMyRentalRequests";
import TenantDashboardHeader from "@/app/dashboard/_components/tenant/shared/TenantDashboardHeader";
import TenantDashboardShell from "@/app/dashboard/_components/tenant/shared/TenantDashboardShell";

export default async function PaymentInitiationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const [user, request] = await Promise.all([
    getMe(),
    getRentalRequestById(id),
  ]);
  const name = user.success ? user.data?.profile?.name || "Tenant" : "Tenant";
  const amount = request?.property
    ? new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
      }).format(request.property.price)
    : null;

  return (
    <TenantDashboardShell active="requests">
      <div className="min-w-0 flex-1">
        <TenantDashboardHeader
          name={name}
          profileImage={user.success ? user.data?.profile?.profileImage : null}
          title="Complete rental payment"
          description="Review your approved request before checkout"
        />
        <main className="mx-auto max-w-6xl space-y-6 px-5 py-8 sm:px-8 lg:px-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              MY RENTALS / APPROVED / CHECKOUT
            </p>
            <h1 className="mt-3 text-3xl font-bold">Complete rental payment</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your landlord approved the request. Review the amount before continuing.
            </p>
          </div>

          {!request ? (
            <p role="alert" className="rounded-xl border p-6 text-sm text-destructive">
              Rental request not found.
            </p>
          ) : request.status !== "APPROVED" ? (
            <Card className="rounded-xl shadow-none">
              <CardContent className="space-y-4 p-6">
                <p className="font-semibold">This request is not ready for payment.</p>
                <p className="text-sm text-muted-foreground">
                  Only approved rental requests can continue to checkout.
                </p>
                <Button asChild variant="outline">
                  <Link href={`/dashboard/tenant/requests/${id}`}>View request details</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-start gap-3 rounded-xl border-l-4 border-l-primary bg-card p-5 shadow-sm">
                <Check className="mt-1 size-5 shrink-0 text-primary" />
                <div>
                  <h2 className="text-lg font-bold text-primary">Request approved</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You can now complete payment for {request.property?.title || "this rental"}.
                  </p>
                </div>
              </div>

              {error && (
                <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                  {error}
                </p>
              )}

              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
                <Card className="rounded-xl shadow-none">
                  <CardContent className="space-y-6 p-6">
                    <h2 className="text-2xl font-bold">Payment summary</h2>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground">PROPERTY</p>
                      <p className="mt-2 font-semibold">
                        {request.property?.title || "Rental property"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground">PAYMENT FOR</p>
                      <p className="mt-2 text-sm">Approved rental request</p>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t pt-5">
                      <span className="font-semibold text-muted-foreground">Amount due</span>
                      <span className="text-2xl font-bold">{amount || "Unavailable"}</span>
                    </div>
                    <form action={createPayment.bind(null, id)}>
                      <Button type="submit" className="w-full">
                        Continue to secure payment <ArrowRight className="size-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="h-fit rounded-xl shadow-none">
                  <CardContent className="space-y-5 p-6">
                    <h2 className="text-xl font-bold">Secure checkout</h2>
                    <p className="text-sm text-muted-foreground">
                      Payment continues through Stripe Checkout after an approved rental request.
                    </p>
                    <div className="space-y-3 border-t pt-5 text-sm text-muted-foreground">
                      <p>Only approved rentals can pay.</p>
                      <p>Stripe opens its secure checkout page.</p>
                      <p>Check payment status after returning.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </main>
      </div>
    </TenantDashboardShell>
  );
}
