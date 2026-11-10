
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { PropertyCard } from "./propertyCard";
// import { Property } from "@/lib/types";
// import { getProperties } from "../_actions/getProperties";


// export async function PropertiesSection() {
//   let properties;

//   try {
//     properties = await getProperties(6);
//   } catch {
//     return (
//       <section className="mx-auto max-w-7xl px-4 py-20 text-center">
//         <h2 className="text-2xl font-semibold">
//           Explore Properties
//         </h2>
//         <p className="mt-4 text-muted-foreground">
//           Properties could not be loaded right now.
//         </p>
//       </section>
//     );
//   }

//   return (
//     <section className="py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
//           <div className="space-y-3">
//             <span className="text-sm font-semibold uppercase tracking-wider text-primary">
//               Explore Rentals
//             </span>

//             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
//               Discover Your Next Home
//             </h2>

//             <p className="max-w-xl text-muted-foreground">
//               Browse rental properties and find the
//               perfect place for your next chapter.
//             </p>
//           </div>

//           <Button variant="outline" asChild>
//             <Link href="/properties">
//               View All Properties
//             </Link>
//           </Button>
//         </div>

//         {properties.length === 0 ? (
//           <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center text-muted-foreground">
//             No properties available right now.
//           </div>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {properties.map((property:Property) => (
//               <PropertyCard
//                 key={property.id}
//                 property={property}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
