
// import { notFound } from "next/navigation";
// import { Separator } from "@/components/ui/separator";

// import { PropertyHeader } from "@/components/property-details/server/property-header";
// import { PropertyImage } from "@/components/property-details/server/property-image";
// import { PropertyAbout } from "@/components/property-details/server/property-about";
// import { PropertyOverview } from "@/components/property-details/server/property-overview";
// import { PropertyAmenities } from "@/components/property-details/server/property-amenities";
// import { RentalSummary } from "@/components/property-details/server/rental-summary";

// import {
//   getPropertyById,
//   getCategoryName,
// } from "@/lib/services/properties";

// type PageProps = {
//   params: Promise<{ id: string }>;
// };

// export default async function PropertyDetailsPage({
//   params,
// }: PageProps) {
//   const { id } = await params;

//   const property = await getPropertyById(id);

//   if (!property) {
//     notFound();
//   }

//   const categoryName = await getCategoryName(
//     property.categoryId
//   );

//   return (
//     <main className="min-h-screen bg-background">
//       {/* Reuse the existing shared Navbar in your layout */}

//       <div className="mx-auto max-w-[1280px] space-y-10 px-4 pb-14 pt-8 xl:px-0">
//         <PropertyHeader
//           property={property}
//           categoryName={categoryName}
//         />

//         <PropertyImage property={property} />

//         <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,804px)_380px]">
//           <div className="space-y-10">
//             <PropertyAbout
//               description={property.description}
//             />

//             <Separator />

//             <PropertyOverview
//               property={property}
//               categoryName={categoryName}
//             />

//             <PropertyAmenities
//               amenities={property.amenities}
//             />
//           </div>

//           <aside className="lg:sticky lg:top-6">
//             <RentalSummary
//               property={property}
//               categoryName={categoryName}
//             />
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// }
