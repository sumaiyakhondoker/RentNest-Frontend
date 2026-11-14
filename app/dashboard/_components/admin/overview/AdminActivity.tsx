import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Property, RentalRequest, UserProfile } from "@/lib/types";

type AdminActivityProps = {
  users: UserProfile[];
  properties: Property[];
  rentals: RentalRequest[];
  hasError: boolean;
};

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  AVAILABLE: "bg-green-100 text-green-800",
  APPROVED: "bg-blue-100 text-blue-800",
  PENDING: "bg-amber-100 text-amber-800",
  REJECTED: "bg-red-100 text-red-800",
  BANNED: "bg-red-100 text-red-800",
  COMPLETED: "bg-gray-100 text-gray-700",
  RENTED: "bg-gray-100 text-gray-700",
};

export default function AdminActivity({ users, properties, rentals, hasError }: AdminActivityProps) {
  const propertyNames = new Map(properties.map((property) => [property.id, property.title]));
  const activities = [
    ...users.map((user) => ({
      id: `user-${user.id}`,
      activity: "User registered",
      relatedTo: user.name,
      date: user.createdAt,
      status: user.accountStatus,
    })),
    ...properties.map((property) => ({
      id: `property-${property.id}`,
      activity: "Property published",
      relatedTo: property.title,
      date: property.createdAt,
      status: property.availability,
    })),
    ...rentals.map((request) => ({
      id: `rental-${request.id}`,
      activity: "Rental request submitted",
      relatedTo: propertyNames.get(request.propertyId) || `Property ${request.propertyId.slice(0, 8)}`,
      date: request.createdAt,
      status: request.status,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <Card className="gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-xl font-bold">Platform activity</h2>
        <p className="mt-1 text-sm text-muted-foreground">Recent activity across RentNest.</p>

        {hasError && activities.length === 0 ? (
          <p role="alert" className="mt-6 text-sm text-destructive">
            Could not load platform activity. Refresh to try again.
          </p>
        ) : activities.length === 0 ? (
          <p className="mt-6 rounded-lg bg-muted p-6 text-center text-sm text-muted-foreground">
            No platform activity yet.
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <Table className="min-w-160 text-left">
              <TableHeader className="bg-muted text-xs font-bold text-muted-foreground">
                <TableRow>
                  <TableHead className="rounded-l-lg px-4 py-3">ACTIVITY</TableHead>
                  <TableHead className="px-3 py-3">RELATED TO</TableHead>
                  <TableHead className="px-3 py-3">DATE</TableHead>
                  <TableHead className="rounded-r-lg px-3 py-3">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((item) => (
                  <TableRow key={item.id} className="border-b last:border-b-0">
                    <TableCell className="px-4 py-4 font-semibold">{item.activity}</TableCell>
                    <TableCell className="px-3 py-4 text-muted-foreground">{item.relatedTo}</TableCell>
                    <TableCell className="px-3 py-4 text-muted-foreground">
                      {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(item.date))}
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <Badge variant="secondary" className={statusColors[item.status]}>
                        {item.status[0] + item.status.slice(1).toLowerCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
