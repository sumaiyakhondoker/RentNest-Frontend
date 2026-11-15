"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardPagination, { DASHBOARD_PAGE_SIZE } from "@/app/dashboard/_components/shared/DashboardPagination";
import RentalStatusBadge from "@/app/dashboard/_components/shared/RentalStatusBadge";
import type { AdminRentalsResponse, Property, UserProfile } from "@/lib/types";

type Props = {
  requests: AdminRentalsResponse["data"];
  properties: Property[];
  users: UserProfile[];
  hasError: boolean;
};

function formatDate(value?: string | null) {
  return value
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(value))
    : "—";
}

const AdminRequestsTable = ({ requests, properties, users, hasError }: Props) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(requests.length / DASHBOARD_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRequests = requests.slice((currentPage - 1) * DASHBOARD_PAGE_SIZE, currentPage * DASHBOARD_PAGE_SIZE);

  return (
    <Card className="gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="p-4 sm:p-5">
        {hasError ? (
          <p role="alert" className="p-5 text-sm text-destructive">
            Could not load rental requests. Refresh to try again.
          </p>
        ) : requests.length === 0 ? (
          <p className="p-5 text-center text-sm text-muted-foreground">No rental requests yet.</p>
        ) : (
          <Table className="min-w-190 text-left">
            <TableHeader className="bg-muted text-xs font-bold text-muted-foreground">
              <TableRow>
                <TableHead className="rounded-l-lg px-4 py-3">PROPERTY</TableHead>
                <TableHead className="px-3 py-3">TENANT</TableHead>
                <TableHead className="px-3 py-3">LANDLORD</TableHead>
                <TableHead className="px-3 py-3">REQUESTED</TableHead>
                <TableHead className="px-3 py-3">MOVE-IN</TableHead>
                <TableHead className="rounded-r-lg px-3 py-3">STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRequests.map((request) => {
                const property = properties.find((item) => item.id === request.propertyId);
                const tenant = users.find((item) => item.id === request.tenantId);
                const landlord = users.find((item) => item.id === property?.landlordId);

                return (
                  <TableRow key={request.id} className="border-b last:border-b-0">
                    <TableCell className="px-4 py-4 font-semibold">
                      {property?.title || `Property ${request.propertyId.slice(0, 8)}`}
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      {tenant?.name || `Tenant ${request.tenantId.slice(0, 8)}`}
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      {landlord?.name || "Unknown landlord"}
                    </TableCell>
                    <TableCell className="px-3 py-4 text-muted-foreground">{formatDate(request.createdAt)}</TableCell>
                    <TableCell className="px-3 py-4 text-muted-foreground">{formatDate(request.moveInDate)}</TableCell>
                    <TableCell className="px-3 py-4"><RentalStatusBadge status={request.status} /></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        {!hasError && <DashboardPagination page={currentPage} totalItems={requests.length} itemLabel="requests" onPageChange={setPage} />}
      </CardContent>
    </Card>
  );
};

export default AdminRequestsTable;
