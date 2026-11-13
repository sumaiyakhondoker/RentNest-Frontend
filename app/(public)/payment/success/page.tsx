import { getPaymentById } from "../_actions/getPaymentById";
import { getRentalRequestById } from "@/app/dashboard/tenant/_actions/getMyRentalRequests";
import PaymentSuccessCard from "./_components/PaymentSuccessCard";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ paymentId?: string; session_id?: string }>;
}) {
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
