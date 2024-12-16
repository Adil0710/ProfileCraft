import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect signed-in users away from auth-related pages
  if (token) {
    if (
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Redirect non-authenticated users trying to access the dashboard
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow requests to proceed for all other paths
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard/:path*", "/verify/:path*"],
};
