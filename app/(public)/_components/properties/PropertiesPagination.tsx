
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PropertiesQuery } from "../../_actions/getProperties";


type PropertiesPaginationProps = {
  currentPage: number;
  totalPages: number;
  query: PropertiesQuery;
};

export default function PropertiesPagination({
  currentPage,
  totalPages,
  query,
}: PropertiesPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  function getPageUrl(page: number) {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    params.set("page", String(page));

    return `/properties?${params.toString()}`;
  }

  return (
    <Pagination
      aria-label="Property pagination"
      className="pt-6"
    >
      <PaginationContent className="gap-4">
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
