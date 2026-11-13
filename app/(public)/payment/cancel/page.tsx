import { getPaymentById } from "../_actions/getPaymentById";
import PaymentCancelCard from "./_components/PaymentCancelCard";

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ paymentId?: string; rentalRequestId?: string }>;
}) {
  const { paymentId } = await searchParams;
  const result = paymentId ? await getPaymentById(paymentId) : null;
  const payment = result?.success ? result.data : undefined;
  const isCompleted = payment?.status === "COMPLETED";
  const isUnavailable = !payment;

  return (
    <div className="mx-auto min-h-180 max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-xs font-medium tracking-wide text-muted-foreground">
        MY RENTALS / PAYMENT / {isCompleted ? "CONFIRMED" : isUnavailable ? "STATUS" : "NOT COMPLETED"}
      </p>
      <h1 className="mt-5 text-3xl font-bold tracking-tight">
        {isCompleted
          ? "Payment confirmed"
          : isUnavailable
            ? "Payment status unavailable"
            : "Payment not completed"}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {isCompleted
          ? "Your payment has been recorded for this rental request."
          : isUnavailable
            ? "We could not check this payment record."
            : "Your checkout was cancelled or did not finish successfully."}
      </p>

      <PaymentCancelCard
        payment={payment}
        errorMessage={result && !result.success ? result.message : "Payment information was not provided."}
      />
    </div>
  );
}
