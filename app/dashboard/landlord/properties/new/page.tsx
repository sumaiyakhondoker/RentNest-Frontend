import { Suspense } from "react";
import DashboardNavigationLoading from "@/app/dashboard/_components/shared/DashboardNavigationLoading";
import MyPropertiesContent from "@/app/dashboard/_components/landlord/properties/MyPropertiesContent";

const NewPropertyPage = () => {
  return (
    <Suspense fallback={<DashboardNavigationLoading />}>
      <MyPropertiesContent query={{}} />
    </Suspense>
  );
};

export default NewPropertyPage;
