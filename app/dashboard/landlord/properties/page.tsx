import MyPropertiesContent from "@/app/dashboard/_components/landlord/properties/MyPropertiesContent";

export default function MyPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; create?: string }>;
}) {
  return <MyPropertiesContent searchParams={searchParams} />;
}
