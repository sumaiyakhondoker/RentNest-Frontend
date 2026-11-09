import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
    return (
       <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-16">
      <section className="w-full max-w-xl text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <SearchX className="size-8" aria-hidden="true" />
        </div>

        <p className="mt-8 text-sm font-semibold tracking-[0.2em] text-primary uppercase">
          Error 404
        </p>

        <h1 className="mt-3 text-xl font-bold tracking-tight text-foreground sm:text-5xl">
          This page wandered off
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
          We couldn't find the page you were looking for. It may have been
          moved or the link might be incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Home data-icon="inline-start" />
              Go to homepage
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border"
          >
            <Link href="/properties">
              <ArrowLeft data-icon="inline-start" />
              Browse properties
            </Link>
          </Button>
        </div>
      </section>
    </div>
    );
};

export default NotFound;