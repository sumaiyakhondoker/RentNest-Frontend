"use client";

import { useState } from "react";
import { Search, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { UserProfile } from "@/lib/types";
import UserStatusButton from "./UserStatusButton";

const PAGE_SIZE = 10;

export default function UserTable({ users, hasError }: { users: UserProfile[]; hasError: boolean }) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const filteredUsers = users
    .filter((user) =>
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())) &&
      (role === "ALL" || user.role === role) &&
      (status === "ALL" || user.accountStatus === status),
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <Card className="gap-0 rounded-xl py-0 shadow-none">
        <CardContent className="grid gap-4 p-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="relative">
            <Search className="pointer-events-none absolute top-3 left-3 size-4 text-muted-foreground" />
            <Input
              aria-label="Search users by name or email"
              placeholder="Search name or email"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="h-10 rounded-lg pl-9"
            />
          </div>
          <Select value={role} onValueChange={(value) => { setRole(value); setPage(1); }}>
            <SelectTrigger className="h-10 w-full rounded-lg" aria-label="Filter by role">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All roles</SelectItem>
              <SelectItem value="TENANT">Tenants</SelectItem>
              <SelectItem value="LANDLORD">Landlords</SelectItem>
              <SelectItem value="ADMIN">Admins</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(value) => { setStatus(value); setPage(1); }}>
            <SelectTrigger className="h-10 w-full rounded-lg" aria-label="Filter by status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="BANNED">Banned</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="gap-0 rounded-xl py-0 shadow-none">
        <CardContent className="p-4 sm:p-5">
          {hasError ? (
            <p role="alert" className="p-5 text-sm text-destructive">
              Could not load users. Refresh to try again.
            </p>
          ) : filteredUsers.length === 0 ? (
            <p className="p-5 text-center text-sm text-muted-foreground">
              {users.length === 0 ? "No users yet." : "No users match these filters."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-160 text-left">
                <TableHeader className="bg-muted text-xs font-bold text-muted-foreground">
                  <TableRow>
                    <TableHead className="rounded-l-lg px-4 py-3">USER</TableHead>
                    <TableHead className="px-3 py-3">ROLE</TableHead>
                    <TableHead className="px-3 py-3">STATUS</TableHead>
                    <TableHead className="rounded-r-lg px-3 py-3">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageUsers.map((user) => {
                    const imageUrl = user.profileImage?.trim();
                    const validImage = imageUrl?.startsWith("https://") || imageUrl?.startsWith("http://");
                    return (
                      <TableRow key={user.id} className="border-b last:border-b-0">
                        <TableCell className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-10">
                              {validImage && <AvatarImage src={imageUrl} alt={user.name} />}
                              <AvatarFallback className="bg-primary/10 text-primary">
                                <UserRound className="size-5" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="font-semibold">{user.name}</p>
                              <p className="break-all text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-3 py-4 capitalize">{user.role.toLowerCase()}</TableCell>
                        <TableCell className="px-3 py-4">
                          <Badge variant="secondary" className={user.accountStatus === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"}>
                            {user.accountStatus === "ACTIVE" ? "Active" : "Banned"}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-3 py-4"><UserStatusButton user={user} /></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
          {!hasError && filteredUsers.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filteredUsers.length)} of {filteredUsers.length} users
              </p>
              <Pagination aria-label="User pagination" className="mx-0 w-auto justify-end">
                <PaginationContent className="gap-3">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      aria-disabled={currentPage === 1}
                      tabIndex={currentPage === 1 ? -1 : undefined}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        if (currentPage > 1) setPage(currentPage - 1);
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      aria-disabled={currentPage === totalPages}
                      tabIndex={currentPage === totalPages ? -1 : undefined}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        if (currentPage < totalPages) setPage(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
