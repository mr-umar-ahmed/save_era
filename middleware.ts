import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers"; // Use headers() instead

export async function middleware(request: NextRequest) {
  // ✅ FIX: Use headers().get() - works in middleware
  const token = request.cookies.get("savera-auth")?.value;

  const { pathname } = request.nextUrl;

  // PUBLIC ROUTES (no auth required)
  const publicRoutes = ["/", "/auth", "/demo"];

  // If on public route → allow
  if (publicRoutes.includes(pathname)) {
    // If authenticated on auth page → redirect to dashboard
    if (pathname === "/auth" && token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // PROTECTED ROUTES (require auth)
  if (!token) {
    // Not logged in → redirect to auth
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Logged in → allow access
  return NextResponse.next();
}

// Match ALL routes except API/static
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - API routes (/_next/static, /favicon.ico, etc.)
     * - Public files (_next/image, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
