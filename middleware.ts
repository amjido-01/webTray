import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

// Protected routes
const protectedPatterns = ["/dashboard", "/welcome"];

// Auth routes (should redirect to dashboard if logged in)
const authPages = ["/signin", "/signup", "/welcome", "/register-business", "/"];

// Public routes (should redirect to dashboard if logged in)
const publicRoutes = ["/about", "/contact", "/pricing", "/features", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedPatterns.some(
    (pattern) => path === pattern || path.startsWith(`${pattern}/`)
  );
  const isAuthPage = authPages.includes(path);
  const isPublicRoute = publicRoutes.some((route) =>
    route === "/" ? path === "/" : path.startsWith(route)
  );

  // Get access token from cookies
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  console.log("Middleware - Access Token:", accessToken);
  console.log("Middleware - Refresh Token:", refreshToken);

  // Determine if user has any valid session (either token exists)
  const hasSession = !!(accessToken || refreshToken);

  // === NO SESSION (no tokens at all) ===
  if (!hasSession) {
    // Trying to access protected route without session → redirect to signin
    if (isProtectedRoute) {
      const url = new URL("/signin", req.nextUrl);
      url.searchParams.set("redirect", path);
      return NextResponse.redirect(url);
    }

    // On public/auth page without session → allow
    return NextResponse.next();
  }

  // === HAS SESSION (at least one token exists) ===

  // If only refresh token exists, user needs to get new access token
  // Let them through - axios interceptor will handle getting new access token
  if (!accessToken && refreshToken) {
    // Don't redirect away from auth/public pages yet
    // Let axios try to refresh first
    if (isProtectedRoute) {
      return NextResponse.next();
    }

    // On auth/public pages, allow them through
    // Component will fetch user data and redirect if needed
    return NextResponse.next();
  }

  // Has access token - verify it
  try {
    if (!accessToken) {
      // No access token available (narrow types) — allow through (axios will attempt refresh)
      return NextResponse.next();
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
    await jose.jwtVerify(accessToken, secret);
    console.log("Middleware - Access token is valid", secret);

    // ✅ Access token is valid - user is authenticated

    // Redirect authenticated users away from auth/public pages
    if (isAuthPage || isPublicRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    // Allow access to protected routes
    return NextResponse.next();
  } catch (err) {
    // Access token is invalid/expired

    // If has refresh token, let through - axios will handle refresh
    if (refreshToken) {
      // On protected route, let axios interceptor refresh the token
      if (isProtectedRoute) {
        return NextResponse.next();
      }

      // On auth/public pages, allow through
      return NextResponse.next();
    }

    // No refresh token and invalid access token
    // Clear cookies and redirect if on protected route
    const response = isProtectedRoute
      ? NextResponse.redirect(new URL("/signin", req.nextUrl))
      : NextResponse.next();

    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
};
