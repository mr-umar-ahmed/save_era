import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Check for the auth cookie (Must match the name in AuthPage)
  const token = request.cookies.get("savera-auth")?.value;
  const { pathname } = request.nextUrl;

  // 2. Define Public Routes (Pages that DO NOT require login)
  // FIX: Added "/" to this array so the Landing Page is accessible
  const publicRoutes = ["/auth", "/"];

  // 3. LOGIC: If user is already logged in but tries to go to Login page
  if (token && pathname === "/auth") {
    // Redirect them to the Dashboard automatically
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 4. LOGIC: If user is NOT logged in and tries to go to a restricted page (like /dashboard)
  if (!token && !publicRoutes.includes(pathname)) {
    // Redirect them to the Login page
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // 5. If none of the above, let them pass
  return NextResponse.next();
}

// Configuration to prevent middleware from running on static files (images, fonts, etc.)
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public images (svg, png, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};