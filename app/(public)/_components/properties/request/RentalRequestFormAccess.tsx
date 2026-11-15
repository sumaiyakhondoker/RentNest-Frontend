import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMyRentalRequests } from "@/app/dashboard/_actions/tenant/getMyRentalRequests";
import RentalRequestForm from "./RentalRequestForm";
import { rentalRequestStatusText } from "./rentalRequestStatusText";

export default async function RentalRequestFormAccess({ propertyId }: { propertyId: string }) {
  const result = await getMyRentalRequests();
  const existingRequest = result.success && result.data.allRentalRequests.find(
    (request) => request.propertyId === propertyId,
  );

  if (existingRequest) {
    const statusText = rentalRequestStatusText[existingRequest.status];
    return (
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">{statusText.title}</h2>
          <p className="text-sm text-muted-foreground">
            {statusText.description}
          </p>
          <Button asChild variant="outline">
            <Link href="/dashboard/tenant/requests">View my requests</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <RentalRequestForm propertyId={propertyId} />;
}
