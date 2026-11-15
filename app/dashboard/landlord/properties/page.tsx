import { Suspense } from "react";
import DashboardNavigationLoading from "@/app/dashboard/_components/shared/DashboardNavigationLoading";
import MyPropertiesContent from "@/app/dashboard/_components/landlord/properties/MyPropertiesContent";

const MyPropertiesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; create?: string }>;
}) => {
  const query = await searchParams;
  return (
    <Suspense fallback={<DashboardNavigationLoading />}>
      <MyPropertiesContent query={query} />
    </Suspense>
  );
};

export default MyPropertiesPage;
