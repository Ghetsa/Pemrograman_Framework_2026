import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const hanyaAdmin = ["/admin"];
const hanyaEditor = ["/editor"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    // ✅ bypass login page (PENTING anti loop)
    if (pathname.startsWith("/auth")) {
      return middleware(req, next);
    }

    if (requireAuth.some((path) => pathname.startsWith(path))) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // 🔐 belum login
      if (!token) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(url);
      }

      const role = token.role as string;

      // 🔒 ADMIN ONLY
      if (
        hanyaAdmin.some((path) => pathname.startsWith(path)) &&
        role !== "admin"
      ) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // ✏️ EDITOR ONLY
      if (
        hanyaEditor.some((path) => pathname.startsWith(path)) &&
        !["editor", "admin"].includes(role)
      ) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return middleware(req, next);
  };
}