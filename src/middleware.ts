import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  apiAuthPrefixRoute,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  privateRoutes,
  publicRoutes,
} from "./routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiPreficRoute = nextUrl.pathname.startsWith(apiAuthPrefixRoute);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

  if (isApiPreficRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.rewrite(new URL(req.url));
  }

  if (isPrivateRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }

  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
