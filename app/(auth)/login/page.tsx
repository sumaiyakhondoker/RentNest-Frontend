import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <Link
            href="/"
            className="flex size-12 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground"
          >
            R
          </Link>

          <span className="text-xl font-semibold tracking-tight text-foreground">
            RentNest
          </span>
        </div>

        {/* Login Card */}
        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight text-card-foreground">
              Welcome back
            </CardTitle>

            <CardDescription className="text-muted-foreground">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5">
              {/* Email */}
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

              {/* Password */}
              <div className="space-y-2">
                {/* <div className="flex items-center justify-between gap-2"> */}
                  <Label htmlFor="password">Password</Label>

{/*                   
                </div> */}

                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-11"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Login
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center">
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} RentNest. All rights reserved.
        </p>
      </div>
    </div>
    );
};

export default LoginPage;