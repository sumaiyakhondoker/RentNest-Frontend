
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
      src="/rentnest-logo.png"
      width={60}
      height={60}
      alt="Picture of the author"
    />

          <span className="text-2xl font-bold tracking-tight text-foreground">
            Rent<span className="text-primary">Nest</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>

          <Button asChild>
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </div>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none pr-2">
            <Menu size={20} />
          </summary>

          <div className="absolute right-0 top-12 flex w-52 flex-col gap-2 rounded-xl border border-border bg-popover p-3 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/auth/login"
              className="rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              Login
            </Link>

            <Button asChild size="sm">
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </details>
      </nav>
    </header>
  );
}
