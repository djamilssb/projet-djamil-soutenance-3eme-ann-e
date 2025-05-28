import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const isApiRoute = req.nextUrl.pathname.startsWith("/api");

  if (!token) {
    if (isApiRoute) {
      return NextResponse.json({
        error: "Unauthorized",
        message: "You must be logged in to access this resource."
      }, {
        status: 401
      });
    }
    return NextResponse.redirect(new URL("/connexion", req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/users/:path*",
    "/api/departement/:path*",
    "/api/organizations/:path*",
    "/api/avatar/:path*",
    "/api/characters/:path*",
    "/api/savequizz/:path*",
    "/api/quizz/:path*",
    "/api/answers/:path*",
    "/api/questions/:path*",
    "/game/:path*",
  ],
};
