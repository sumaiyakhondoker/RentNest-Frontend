import { Suspense } from "react";
import { Loader } from "lucide-react";
import { getPaymentById } from "@/app/(public)/_actions/payment/getPaymentById";
import { getRentalRequestById } from "@/app/dashboard/_actions/tenant/getMyRentalRequests";
import PaymentSuccessCard from "@/app/(public)/_components/payment/PaymentSuccessCard";

type SuccessSearchParams = Promise<{ paymentId?: string; session_id?: string }>;

async function PaymentSuccessContent({ searchParams }: { searchParams: SuccessSearchParams }) {
  const { paymentId, session_id: sessionId } = await searchParams;
  const result = paymentId ? await getPaymentById(paymentId) : null;
  const payment = result?.success ? result.data : undefined;
  const sessionMatches = Boolean(sessionId && payment?.transactionId === sessionId);
  const confirmed = payment?.status === "COMPLETED" && sessionMatches;
  const request = confirmed && payment?.rentalRequestId
    ? await getRentalRequestById(payment.rentalRequestId)
    : null;

  return (
    <div className="mx-auto min-h-180 max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-xs font-medium tracking-wide text-muted-foreground">
        MY RENTALS / PAYMENT / CONFIRMATION
      </p>
      <h1 className="mt-5 text-3xl font-bold tracking-tight">Payment confirmation</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Your payment status is checked against your rental payment record.
      </p>

      <PaymentSuccessCard
        payment={payment}
        confirmed={confirmed}
        sessionMatches={sessionMatches}
        propertyTitle={request?.property?.title}
        errorMessage={result && !result.success ? result.message : undefined}
      />
    </div>
  );
}

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: SuccessSearchParams;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-96 items-center justify-center gap-3 text-primary" role="status">
          <Loader className="size-6 animate-spin" aria-hidden="true" />
          <span>Checking payment status...</span>
        </div>
      }
    >
      <PaymentSuccessContent searchParams={searchParams} />
    </Suspense>
  );
}
