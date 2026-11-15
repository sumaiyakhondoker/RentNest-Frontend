"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const DASHBOARD_PAGE_SIZE = 10;

const DashboardPagination = ({
  page,
  totalItems,
  itemLabel,
  onPageChange,
}: {
  page: number;
  totalItems: number;
  itemLabel: string;
  onPageChange: (page: number) => void;
}) => {
  if (totalItems === 0) return null;

  const totalPages = Math.max(1, Math.ceil(totalItems / DASHBOARD_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const firstItem = (currentPage - 1) * DASHBOARD_PAGE_SIZE + 1;
  const lastItem = Math.min(currentPage * DASHBOARD_PAGE_SIZE, totalItems);

  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
      <p className="text-sm text-muted-foreground">
        Showing {firstItem}–{lastItem} of {totalItems} {itemLabel}
      </p>
      <Pagination aria-label={`${itemLabel} pagination`} className="mx-0 w-auto justify-end">
        <PaginationContent className="gap-3">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
              onClick={(event) => {
                event.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage === totalPages ? -1 : undefined}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
              onClick={(event) => {
                event.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DashboardPagination;
