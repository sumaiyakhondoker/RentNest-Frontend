
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { logout } from "@/service/logout";

;

// Navigation items
const navItems = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
];

type Role = "TENANT" | "LANDLORD" | "ADMIN";

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  profileImage: string | null;
};

type GetMeResponse = {
  success: boolean;
  message: string;
  data?: {
    profile: User;
  };
};

type NavbarProps = {
  user: GetMeResponse;
};

// Dashboard routes based on role
const dashboardRoutes: Record<Role, string> = {
  TENANT: "/dashboard/tenant",
  LANDLORD: "/dashboard/landlord",
  ADMIN: "/dashboard/admin",
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [imageError, setImageError] = useState(false);

  const profile = user.success ? user.data?.profile : null;

  const dashboardPath = profile
    ? dashboardRoutes[profile.role]
    : null;

  const userMenuItems = [
    {
      label: "My Profile",
      icon: UserRound,
      href: dashboardPath ? `${dashboardPath}/profile` : "/auth/login",
    },
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: dashboardPath ?? "/dashboard",
    },
  ];

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      try {
        setIsLoggingOut(true);

        await logout();

        toast.success("Logged out successfully!");

        router.replace("/auth/login");
        router.refresh()
       
      } catch {
        toast.error("Something went wrong while logging out");
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  const profileImage = profile?.profileImage?.trim();

  const validImage = (() => {
    if (!profileImage) return false;

    try {
      const url = new URL(profileImage);
      return url.protocol === "http:" ||
        url.protocol === "https:";
    } catch {
      return false;
    }
  })();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/rentnest-logo.png"
            width={70}
            height={70}
            alt="RentNest logo"
          />

          <span className="text-2xl font-bold tracking-tight text-foreground">
            Rent<span className="text-primary">Nest</span>
          </span>
        </Link>

        {/* Navigation Links */}
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

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  aria-label="Open user menu"
                  variant="ghost"
                  size="icon-lg"
                  className="size-10 overflow-hidden rounded-full border border-border bg-primary/10 p-0"
                >
                  {validImage && !imageError ? (
                    <Image
                      src={profileImage!}
                      alt={profile.name}
                      width={40}
                      height={40}
                      unoptimized
                      className="size-10 rounded-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <UserRound className="size-5 text-primary" />
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-60"
              >
                {/* User Information */}
                <DropdownMenuLabel className="space-y-1">
                  <p className="truncate text-sm font-semibold">
                    {profile.name}
                  </p>

                  <p className="truncate text-xs font-normal text-muted-foreground">
                    {profile.email}
                  </p>

                  <p className="pt-1 text-xs font-semibold capitalize text-primary">
                    {profile.role.toLowerCase()}
                  </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Profile & Dashboard */}
                {userMenuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <DropdownMenuItem
                      key={item.label}
                      asChild
                    >
                      <Link href={item.href}>
                        <Icon className="mr-2 size-4" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                  disabled={isLoggingOut}
                  onSelect={() =>
                    void handleUserMenuAction("logout")
                  }
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 size-4" />
                  {isLoggingOut
                    ? "Logging out..."
                    : "Log out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>

              <Button asChild>
                <Link href="/auth/register">
                  Register
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation" className="md:hidden">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-5 md:hidden">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-10 flex flex-col gap-2">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link href={item.href} className="rounded-md px-3 py-2 text-sm hover:bg-accent">
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                {!profile && (
                  <>
                    <SheetClose asChild>
                      <Link href="/auth/login" className="rounded-md px-3 py-2 text-sm hover:bg-accent">
                        Login
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild size="sm">
                        <Link href="/auth/register">Register</Link>
                      </Button>
                    </SheetClose>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
