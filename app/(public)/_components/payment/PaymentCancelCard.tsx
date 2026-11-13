import Link from "next/link";
import { AlertCircle, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PaymentDetails } from "@/lib/types";

type Props = {
  payment?: PaymentDetails;
  errorMessage?: string;
};

export default function PaymentCancelCard({ payment, errorMessage }: Props) {
  const isCompleted = payment?.status === "COMPLETED";
  const isUnavailable = !payment;
  const canRetry =
    payment?.rentalRequestId &&
    payment.rentalRequest?.status === "APPROVED" &&
    !isCompleted;

  return (
    <Card className="mx-auto mt-16 max-w-[725px] rounded-2xl shadow-none">
      <CardContent className="p-7 sm:p-8">
        <div className="text-center">
          <div
            className={`mx-auto flex size-24 items-center justify-center rounded-full ${
              isCompleted ? "bg-primary/10 text-primary" : "bg-secondary text-destructive"
            }`}
          >
            {isCompleted ? (
              <Check className="size-12" strokeWidth={2.5} />
            ) : (
              <AlertCircle className="size-12" strokeWidth={2.5} />
            )}
          </div>
          <h2 className="mt-5 text-2xl font-bold">
            {isCompleted
              ? "Payment already completed"
              : isUnavailable
                ? "Payment status unavailable"
                : "No confirmed payment"}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            {isCompleted
              ? "This rental payment has been confirmed. You can view it in your payment history."
              : errorMessage ||
                "A successful payment has not been verified. Check your payment history before attempting another checkout."}
          </p>
        </div>

        {!isCompleted && !isUnavailable && (
          <div className="mt-9 border-t pt-5">
            <h3 className="text-xs font-bold text-muted-foreground">WHAT TO DO NEXT</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Return to My Rentals and check the latest status. If you were charged
              but do not see a completed payment, contact support before retrying.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-3">
          {canRetry && (
            <Button asChild variant="outline" className="w-full">
              <Link href={`/dashboard/tenant/requests/${payment.rentalRequestId}/pay`}>
                Try payment again
              </Link>
            </Button>
          )}
          <Button asChild className="w-full">
            <Link href={isCompleted ? "/dashboard/tenant/payments" : "/dashboard/tenant/requests"}>
              {isCompleted ? "View payment history" : "Back to my rentals"}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
