import MyRentalRequestsList from "@/app/dashboard/_components/tenant/requests/MyRentalRequestsList";

const MyRentalRequestsPage = () => {
  return (
    <main className="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 lg:px-10">
      <div>
        <h2 className="text-2xl font-bold">All requests</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          See the latest status of each rental request.
        </p>
      </div>
      <MyRentalRequestsList />
    </main>
  );
};

export default MyRentalRequestsPage;
