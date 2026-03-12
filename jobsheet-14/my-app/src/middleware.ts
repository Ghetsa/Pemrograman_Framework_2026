import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = request.cookies.get("isLogin")?.value;

  if (isLogin === "true") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/produk", "/about"],
};