import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RentalSteps() {
  return (
    <Card className="gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-lg font-bold">How rental requests work</h2>
        <ol className="mt-6 space-y-4 text-sm text-muted-foreground">
          {[
            "Submit a rental request",
            "Wait for landlord approval",
            "Pay securely once approved",
          ].map((step, index) => (
            <li key={step} className="flex items-center gap-3">
              <Badge variant="secondary" className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent p-0 text-xs font-bold text-primary">
                0{index + 1}
              </Badge>
              {step}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
