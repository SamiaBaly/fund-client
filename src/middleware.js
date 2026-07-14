import { NextResponse } from "next/server";


const protectedRoutes = [
  "/dashboard",
  "/profile",
];


export function middleware(request) {

  const { pathname } = request.nextUrl;


  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );


  if (!isProtected) {
    return NextResponse.next();
  }


  // temporary check
  const session = request.cookies.get(
    "better-auth.session_token"
  );


  if (!session) {

    return NextResponse.redirect(
      new URL("/login", request.url)
    );

  }


  return NextResponse.next();

}



export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};