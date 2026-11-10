"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerAction } from "../_actions/authActions";

const RegisterForm=()=> {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "TENANT",
      password: "",
     
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const result = await registerAction(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

   
    
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your full name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          className="h-10"
          {...register("name")}
        />
        {errors.name && (
          <p role="alert" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          className="h-10"
          {...register("email")}
        />
        {errors.email && (
          <p role="alert" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone number (optional)</Label>
        <Input
          id="phone"
          type="tel"
          inputMode="numeric"
          maxLength={11}
          placeholder="11 characters"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          className="h-10"
          {...register("phone")}
        />
        <p className="text-xs text-muted-foreground">
          If provided, enter exactly 11 characters.
        </p>
        {errors.phone && (
          <p role="alert" className="text-sm text-destructive">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Account type</Label>
        <select
          id="role"
          aria-invalid={!!errors.role}
          className="h-10 w-full rounded-4xl border border-input bg-input/30 px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive"
          {...register("role")}
        >
          <option value="TENANT">Tenant — I'm looking for a home</option>
          <option value="LANDLORD">Landlord — I want to list a property</option>
        </select>
        {errors.role && (
          <p role="alert" className="text-sm text-destructive">
            {errors.role.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 7 characters"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            className="h-10 pr-12"
            {...register("password")}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute top-1/2 right-1 -translate-y-1/2"
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        {errors.password && (
          <p role="alert" className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}


export default RegisterForm;