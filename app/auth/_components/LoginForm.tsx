
"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginAction } from "../_actions/authActions";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
   const result = await loginAction(data)
   if(!result.success){
    toast.error(result.message)
    return
   }

   

  };

  return (
     <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email address
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className="h-11"
                  {...register("email")}
                />

                {errors.email && (
                  <p role="alert" className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
  <Label htmlFor="password">Password</Label>

  <div className="relative">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      autoComplete="current-password"
      aria-invalid={!!errors.password}
      className="h-11 pr-12"
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
                {isSubmitting ?(
          <>
            <LoaderCircle className="animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
              </Button>
            </form>
  );
};

export default LoginForm;
