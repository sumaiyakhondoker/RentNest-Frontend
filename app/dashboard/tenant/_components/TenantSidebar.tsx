import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CreditCard, LayoutGrid, ListChecks, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export default function TenantSidebar({ active = "overview" }: { active?: "overview" | "requests" | "payments" | "profile" }) {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="px-4 pt-5">
      <Link href="/" className="flex items-center">
        <Image src="/rentnest-logo.png" width={70} height={70} alt="RentNest logo" />
        <span className="text-2xl font-bold tracking-tight text-foreground">
          Rent<span className="text-primary">Nest</span>
        </span>
      </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>YOUR SPACE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem><SidebarMenuButton asChild isActive={active === "overview"} className={active === "overview" ? "text-primary" : undefined}><Link href="/dashboard/tenant" aria-current={active === "overview" ? "page" : undefined}><LayoutGrid /> <span>Overview</span></Link></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton asChild isActive={active === "requests"} className={active === "requests" ? "text-primary" : undefined}><Link href="/dashboard/tenant/requests" aria-current={active === "requests" ? "page" : undefined}><ListChecks /> <span>My rental requests</span></Link></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton asChild isActive={active === "payments"} className={active === "payments" ? "text-primary" : undefined}><Link href="/dashboard/tenant/payments" aria-current={active === "payments" ? "page" : undefined}><CreditCard /> <span>Payment history</span></Link></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton asChild isActive={active === "profile"} className={active === "profile" ? "text-primary" : undefined}><Link href="/dashboard/tenant/profile" aria-current={active === "profile" ? "page" : undefined}><UserRound /> <span>My profile</span></Link></SidebarMenuButton></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="space-y-4 rounded-2xl bg-accent p-4">
          <h2 className="font-semibold">Need a new place?</h2>
          <p className="text-xs leading-relaxed text-muted-foreground">Discover rentals matched to your next move.</p>
          <Button asChild className="w-full rounded-lg">
            <Link href="/properties">Explore homes <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
