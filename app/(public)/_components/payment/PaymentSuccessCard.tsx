import Link from "next/link";
import { AlertCircle, ArrowRight, Check, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PaymentDetails } from "@/lib/types";

type Props = {
  payment?: PaymentDetails;
  confirmed: boolean;
  sessionMatches: boolean;
  propertyTitle?: string;
  errorMessage?: string;
};

export default function PaymentSuccessCard({
  payment,
  confirmed,
  sessionMatches,
  propertyTitle,
  errorMessage,
}: Props) {
  const checking = Boolean(payment && sessionMatches && payment.status === "PENDING");
  const Icon = confirmed ? Check : checking ? Clock3 : AlertCircle;
  const title = confirmed
    ? "Payment successful"
    : checking
      ? "Confirming your payment"
      : "Payment not confirmed";
  const message = confirmed
    ? "Your rental payment has been recorded successfully."
    : checking
      ? "Stripe has returned to RentNest. Your payment record is still being updated."
      : errorMessage || "We could not verify a completed payment for this checkout session.";
  const amount = payment
    ? new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
      }).format(payment.amount)
    : null;

  return (
    <Card className="mx-auto mt-12 max-w-[724px] rounded-2xl shadow-none">
      <CardContent className="p-6 sm:p-8">
        <div className="text-center">
          <div className={`mx-auto flex size-24 items-center justify-center rounded-full ${confirmed ? "bg-primary/10 text-primary" : checking ? "bg-amber-50 text-amber-700" : "bg-destructive/10 text-destructive"}`}>
            <Icon className="size-12" strokeWidth={2.5} />
          </div>
          <h2 className="mt-5 text-2xl font-bold">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        </div>

        {confirmed && payment && (
          <div className="mt-8 grid gap-x-10 gap-y-6 border-t pt-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold text-muted-foreground">PROPERTY</p>
              <p className="mt-2 font-semibold">{propertyTitle || "Rental property"}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground">AMOUNT PAID</p>
              <p className="mt-2 text-xl font-bold">{amount}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground">PAYMENT PROVIDER</p>
              <p className="mt-2 font-semibold">{payment.provider}</p>
            </div>
            <div className="flex items-end">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Completed
              </Badge>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-3">
          {checking && payment?.transactionId && (
            <Button asChild variant="outline" className="w-full">
              <a href={`/payment/success?paymentId=${encodeURIComponent(payment.id)}&session_id=${encodeURIComponent(payment.transactionId)}`}>
                Check payment status
              </a>
            </Button>
          )}
          <Button asChild className="w-full">
            <Link href="/dashboard/tenant/requests">
              Back to my rentals <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
