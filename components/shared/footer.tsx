
import Link from "next/link";

export function Footer() {

  return (
    <footer className="border-t border-border bg-muted/40 sticky">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm space-y-3">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              Rent<span className="text-primary">Nest</span>
            </Link>

            <p className="text-sm leading-6 text-muted-foreground">
              Find and list rental properties with ease.
              Your next home starts here.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>

              <Link
                href="/properties"
                className="hover:text-primary"
              >
                Properties
              </Link>

              <Link
                href="/login"
                className="hover:text-primary"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="hover:text-primary"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2026 RentNest.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}
