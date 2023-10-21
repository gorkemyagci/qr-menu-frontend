import { NextResponse } from "next/server";

export function middleware(req) {
  let token = req.cookies.get('accessToken')
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.nextUrl).href);
    }
  }
}