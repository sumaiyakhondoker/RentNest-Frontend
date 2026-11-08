import React from 'react';

const LoginPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md border-slate-200 bg-white shadow-lg shadow-slate-200/50">
        <CardHeader className="space-y-3 text-center">
          <Link
            href="/"
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-xl font-bold text-white"
          >
            R
          </Link>

          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription>
              Sign in to your RentNest account
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

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

            <Button type="submit" className="h-11 w-full">
              Sign in
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-slate-900 hover:underline"
            >
              Create an account
            </Link>
          </p>

          <p className="text-center text-xs text-slate-400">
            © {new Date().getFullYear()} RentNest. All rights reserved.
          </p>
        </CardFooter>
      </Card>
 
        </div>
    );
};

export default LoginPage;