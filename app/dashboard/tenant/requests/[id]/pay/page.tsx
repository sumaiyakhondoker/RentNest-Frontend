
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default async function PaymentInitiationPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ error?: string }>;
// }) {
//   const { error } = await searchParams;

//   return (
//     <main className="mx-auto flex min-h-screen max-w-lg items-center px-5">
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Could not start payment</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-5">
//           <p role="alert" className="text-sm text-destructive">
//             {error || "The checkout page could not be opened."}
//           </p>
//           <Button asChild variant="outline">
//             <Link href="/dashboard/tenant/requests">Back to rental requests</Link>
//           </Button>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }
