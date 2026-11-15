import MyPropertiesContent from "@/app/dashboard/_components/landlord/properties/MyPropertiesContent";

const MyPropertiesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; create?: string }>;
}) => {
  const query = await searchParams;
  return <MyPropertiesContent query={query} />;
};

export default MyPropertiesPage;
