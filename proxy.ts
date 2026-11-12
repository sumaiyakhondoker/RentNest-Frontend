// import { getSubscriptionStatus } from './app/(publicGroup)/_actions/getSubscriptionStatus';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { cookies } from "next/headers";
import { jwtUtils } from "./utils/jwt";
import { getNewAccessToken } from "./service/refreshToken";
import { JwtPayload } from "jsonwebtoken";

const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const PUBLIC_ROUTES = ["/", "/properties", "/auth/login", "/auth/register"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const cookieStore = await cookies();

  
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;
  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;





  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;
      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken
      decodedAccessToken =jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string)

    }
  }

   let userRole = null;

       if (!decodedAccessToken?.success) {
    // token has expired, so delete expired accessToken from cookies
   cookieStore.delete("accessToken");


    // return NextResponse.redirect(new URL("/login", request.url));
  }

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/dashboard/tenant", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    } else if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/dashboard/landlord", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // authentication
  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  if (!accessToken && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // authorization
  if (pathname.startsWith("/dashboard/tenant") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/dashboard/landlord") &&
    userRole !== "LANDLORD"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

/**  if(pathname === "/premium"){
     const statusResult = await getSubscriptionStatus()

  const isActive = Boolean(
    statusResult?.success && statusResult.data?.isSubscribed,
  );

  if(!isActive){
       return NextResponse.redirect(new URL("/payment", request.url));

  }
  }

   */

  //   return NextResponse.redirect(new URL('/', request.url))
  return NextResponse.next();
}

export const config = {
  matcher: [
    // '/dashboard/:path*',
    // '/admin-dashboard/:path*'

    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
