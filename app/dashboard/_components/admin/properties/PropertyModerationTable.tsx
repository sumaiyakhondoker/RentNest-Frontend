"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { propertyImage } from "@/app/dashboard/_components/landlord/propertyImage";
import DashboardPagination, { DASHBOARD_PAGE_SIZE } from "@/app/dashboard/_components/shared/DashboardPagination";
import type { Property, UserProfile } from "@/lib/types";

type Props = {
  properties: Property[];
  users: UserProfile[];
  hasError: boolean;
};

export default function PropertyModerationTable({ properties, users, hasError }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(properties.length / DASHBOARD_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageProperties = properties.slice((currentPage - 1) * DASHBOARD_PAGE_SIZE, currentPage * DASHBOARD_PAGE_SIZE);

  return (
      <Card className="gap-0 rounded-xl py-0 shadow-none">
        <CardContent className="p-4 sm:p-5">
          {hasError ? (
            <p role="alert" className="p-5 text-sm text-destructive">
              Could not load properties. Refresh to try again.
            </p>
          ) : properties.length === 0 ? (
            <p className="p-5 text-center text-sm text-muted-foreground">
              No property listings yet.
            </p>
          ) : (
            <Table className="min-w-180 text-left">
              <TableHeader className="bg-muted text-xs font-bold text-muted-foreground">
                <TableRow>
                  <TableHead className="rounded-l-lg px-4 py-3">PROPERTY</TableHead>
                  <TableHead className="px-3 py-3">LANDLORD</TableHead>
                  <TableHead className="px-3 py-3">RENT</TableHead>
                  <TableHead className="rounded-r-lg px-3 py-3">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageProperties.map((property) => {
                  const landlord = users.find((user) => user.id === property.landlordId);
                  return (
                    <TableRow key={property.id} className="border-b last:border-b-0">
                      <TableCell className="px-4 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-accent">
                            <Image
                              src={propertyImage(property.picture)}
                              alt={property.title}
                              fill
                              unoptimized
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="max-w-64 truncate font-semibold">{property.title}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{property.location}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4">{landlord?.name || "Unknown landlord"}</TableCell>
                      <TableCell className="px-3 py-4 font-semibold">
                        ৳ {property.price.toLocaleString("en-BD")}
                      </TableCell>
                      <TableCell className="px-3 py-4">
                        <Badge variant="secondary" className={property.availability === "AVAILABLE"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-700"}>
                          {property.availability === "AVAILABLE" ? "Available" : "Rented"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
          {!hasError && <DashboardPagination page={currentPage} totalItems={properties.length} itemLabel="properties" onPageChange={setPage} />}
        </CardContent>
      </Card>
  );
}
