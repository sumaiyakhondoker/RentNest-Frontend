
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    <nav
      aria-label="Property pagination"
      className="flex items-center justify-center gap-4 pt-6"
    >
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
      >
        {currentPage > 1 ? (
          <Link href={getPageUrl(currentPage - 1)}>
            Previous
          </Link>
        ) : (
          <span>Previous</span>
        )}
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage < totalPages ? (
          <Link href={getPageUrl(currentPage + 1)}>
            Next
          </Link>
        ) : (
          <span>Next</span>
        )}
      </Button>
    </nav>
  );
}
