
import Link from "next/link";

 const PropertyHeader =()=> {
  return (
    <section className="space-y-5">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li aria-current="page">
            Explore Properties
          </li>
        </ol>
      </nav>

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