import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./Middleware/withAuth";

export function MainMiddleware(request: NextRequest) {
  return NextResponse.next();
}

export default withAuth(MainMiddleware, [
  "/profile",
  "/admin",
  "/editor",
]);

export const config = {
  matcher: [
    "/profile/:path*",
    "/admin/:path*",
    "/editor/:path*",
  ],
};