"use client";




import { registerAction } from "@/app/(auth)/_actions/register-action";
import type { RegisterActionState } from "@/app/(auth)/_actions/register-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialState: RegisterActionState = {
  success: false,
  message: "",
};

export default function RegisterForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.replace("/login");
    }
  }, [router, state]);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your full name"
          autoComplete="name"
          minLength={3}
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone number (optional)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="11 characters"
          autoComplete="tel"
          minLength={11}
          maxLength={11}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">I want to join as</Label>
        <select
          id="role"
          name="role"
          defaultValue="TENANT"
          required
          className="h-11 w-full rounded-4xl border border-input bg-input/30 px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <option value="TENANT">Tenant</option>
          <option value="LANDLORD">Landlord</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="At least 7 characters"
          autoComplete="new-password"
          minLength={7}
          required
          className="h-11"
        />
      </div>

      {state.message && !state.success && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending} className="h-11 w-full">
        {pending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}