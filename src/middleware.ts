import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect signed-in users away from sign-in, sign-up, and verify pages
  if (token) {
    if (
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // If already on dashboard, allow the user to proceed
    if (url.pathname.startsWith("/dashboard")) {
      return NextResponse.next();
    }
  }

  // Redirect non-authenticated users trying to access dashboard to sign-in
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow the request to proceed for public paths
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};
