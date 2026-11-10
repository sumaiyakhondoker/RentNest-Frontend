
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection =() => {
  return (
    <section className="relative isolate flex min-h-135 items-center overflow-hidden bg-primary/10 py-24
     sm:min-h-155">
      <Image
        src="/rentnest-hero.jpg"
        alt="Modern residential house"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/85 to-background/20" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-7">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Find your next home with RentNest
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Find a place you'll
            <span className="text-primary"> love to call home.</span>
          </h1>

          <p className="max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
            Discover rental properties that fit your lifestyle
            and budget. Explore listings, find your ideal space,
            and request to rent with ease.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/properties">
                Explore Properties
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/register">
                List Your Property
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection
