import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // اسمح بالوصول للصفحات العامة
  if (pathname.startsWith("/auth") || pathname.startsWith("/public")) {
    return NextResponse.next();
  }

  // تحقق من token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token) {
    return NextResponse.next();
  }

  // تحويل المستخدم للـ login لو مفيش token
  return NextResponse.redirect(new URL("/auth/login", req.url));
}

// طبق الـ Middleware على الصفحات المحمية فقط
export const config = {
  matcher: ["/cart", "/wishlist", "/checkout"],
};
