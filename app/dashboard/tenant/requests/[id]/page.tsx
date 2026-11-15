import { getRentalRequestById } from "@/app/dashboard/_actions/tenant/getMyRentalRequests";
import RentalRequestDetails from "@/app/dashboard/_components/tenant/requests/RentalRequestDetails";

const RentalRequestDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const request = await getRentalRequestById(id);

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 lg:px-10">
      {request ? (
        <RentalRequestDetails request={request} />
      ) : (
        <p role="alert" className="rounded-xl border p-6 text-sm text-destructive">
          Rental request not found.
        </p>
      )}
    </main>
  );
};

export default RentalRequestDetailsPage;
