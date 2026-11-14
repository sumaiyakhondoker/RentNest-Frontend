import { Card, CardContent } from "@/components/ui/card";
import type { UserProfile } from "@/lib/types";

export default function UserSummary({ users, total }: { users: UserProfile[]; total: number }) {
  const summaries = [
    { label: "All users", value: total },
    { label: "Tenants", value: users.filter((user) => user.role === "TENANT").length },
    { label: "Landlords", value: users.filter((user) => user.role === "LANDLORD").length },
    { label: "Banned", value: users.filter((user) => user.accountStatus === "BANNED").length },
  ];

  return (
    <Card className="gap-0 rounded-xl py-0 shadow-none">
      <CardContent className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
        {summaries.map((summary) => (
          <div key={summary.label}>
            <p className="text-sm text-muted-foreground">{summary.label}</p>
            <p className="mt-2 text-3xl font-bold">{String(summary.value).padStart(2, "0")}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
