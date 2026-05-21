import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/platform(.*)"]);
const isSignInRoute = createRouteMatcher([
  "/platform/sign-in(.*)",
  "/platform/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Sign-in / sign-up pages need to render publicly
  if (isSignInRoute(req)) return;

  // Everything else under /platform requires an authenticated user
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
