import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((req) => {
  // Ensure req.nextUrl exists and has a pathname
  if (!req.nextUrl) {
    return NextResponse.next();
  }

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf/categories",
    "/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf/products/(.*)",
    "/product/(.*)",
    "/category/(.*)",
    "/favicon.ico",
    "/nav-pattern.svg",
    "/logo.png"
  ];

  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.some(route => {
    try {
      return new RegExp(`^${route.replace(/\*/g, '.*')}$`).test(req.nextUrl.pathname || '');
    } catch (error) {
      console.error('Error checking public route:', error);
      return false;
    }
  });

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For non-public routes, require authentication
  const { userId } = getAuth(req);
  
  if (!userId) {
    // Redirect to sign-in page if not authenticated
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}, {
  // Optional: Add debug logging
  debug: process.env.NODE_ENV !== 'production'
});

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    "/((?!.+.[w]+$|_next).*)", 
    "/", 
    "/(api|trpc)(.*)"
  ]
};
