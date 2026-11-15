"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardPagination, { DASHBOARD_PAGE_SIZE } from "@/app/dashboard/_components/shared/DashboardPagination";
import type { Category } from "@/app/(public)/_actions/getProperties";
import type { Property } from "@/lib/types";

export default function CategoryList({
  categories,
  properties,
}: {
  categories: Category[] | null;
  properties: Property[] | null;
}) {
  const [page, setPage] = useState(1);
  const totalItems = categories?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / DASHBOARD_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageCategories = categories?.slice((currentPage - 1) * DASHBOARD_PAGE_SIZE, currentPage * DASHBOARD_PAGE_SIZE) || [];

  return (
    <Card className="min-w-0 gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-xl font-bold">Property categories</h2>
        <p className="mt-1 text-sm text-muted-foreground">Used for classifying and filtering properties.</p>

        {categories === null ? (
          <p role="alert" className="mt-6 text-sm text-destructive">
            Could not load categories. Refresh to try again.
          </p>
        ) : categories.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">No categories yet.</p>
        ) : (
          <div className="mt-6">
            <Table className="table-fixed">
              <TableHeader className="bg-muted text-xs font-bold text-muted-foreground">
                <TableRow>
                  <TableHead className="w-3/4 rounded-l-lg px-4 py-3">CATEGORY</TableHead>
                  <TableHead className="w-1/4 rounded-r-lg px-4 py-3 text-right">LISTINGS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="min-w-0 whitespace-normal px-4 py-5">
                      <p className="break-words font-semibold">{category.categoryName}</p>
                      <p className="mt-1 line-clamp-5 break-words text-xs text-muted-foreground">{category.description}</p>
                    </TableCell>
                    <TableCell className="px-4 py-5 text-right text-muted-foreground">
                      {properties ? properties.filter((property) => property.categoryId === category.id).length : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {categories && <DashboardPagination page={currentPage} totalItems={categories.length} itemLabel="categories" onPageChange={setPage} />}
      </CardContent>
    </Card>
  );
}
