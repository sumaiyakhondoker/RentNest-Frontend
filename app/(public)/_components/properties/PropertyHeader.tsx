
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

 const PropertyHeader =()=> {
  return (
    <section className="space-y-5">
      <Breadcrumb>
        <BreadcrumbList className="gap-4 text-xs font-semibold uppercase tracking-wide">
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Explore Properties</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-[34px]">
          Find your next home
        </h1>

        <p className="text-base text-muted-foreground">
          Discover apartments, studios and houses that fit
          your lifestyle.
        </p>
      </div>
    </section>
  );
}

export default PropertyHeader
