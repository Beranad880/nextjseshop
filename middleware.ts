import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  const cookie = request.cookies.get("admin-session")?.value;
  const session = await decrypt(cookie);

  // 1. Frontend protection (/admin/...)
  if (pathname.startsWith("/admin")) {
    // Already logged in → redirect away from login page
    if (pathname === "/admin/login") {
      if (session) return NextResponse.redirect(new URL("/admin", request.url));
      return NextResponse.next();
    }
    // Not logged in → redirect to login
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 2. API protection (/api/...)
  if (pathname.startsWith("/api")) {
    // Define public API paths/methods
    const isPublicGetProduct = pathname.startsWith("/api/products") && method === "GET";
    const isPublicPostOrder = pathname === "/api/orders" && method === "POST";
    const isPublicImage = pathname.startsWith("/api/images") && method === "GET";
    const isLogin = pathname === "/api/auth/login";
    const isLogout = pathname === "/api/auth/logout";

    if (isPublicGetProduct || isPublicPostOrder || isPublicImage || isLogin || isLogout) {
      return NextResponse.next();
    }

    // Everything else in /api/ requires session
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
