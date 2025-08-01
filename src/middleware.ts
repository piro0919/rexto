import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { createIntlSubrouterMiddleware } from "next-subrouter";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

type Persona = "admin" | "author" | "user";

const intlMiddleware = createIntlMiddleware(routing);
/**
 * Subdomain route configuration for next-subrouter
 */
const subRoutes = [
  { path: "/admin", subdomain: "admin" },
  { path: "/author", subdomain: "author" },
  { path: "/user" }, // default route (no subdomain)
];
/**
 * Create the subrouter middleware with internationalization
 */
const subrouterMiddleware = createIntlSubrouterMiddleware(
  subRoutes,
  intlMiddleware,
  {
    debug: process.env.NODE_ENV === "development",
    defaultLocale: routing.defaultLocale,
    locales: [...routing.locales],
  },
);
/**
 * Public paths configuration for each persona
 */
const PUBLIC_PATHS: Record<Persona, string[]> = {
  admin: [
    "/:locale/sign-in(.*)",
    "/:locale/sign-up(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks(.*)",
  ],
  author: [
    "/:locale/sign-in(.*)",
    "/:locale/sign-up(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks(.*)",
  ],
  user: [
    "/",
    "/:locale",
    "/:locale/search(.*)",
    "/:locale/sign-in(.*)",
    "/:locale/sign-up(.*)",
    "/search(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks(.*)",
  ],
};
/**
 * Cached route matchers for each persona to avoid recreation
 */
const routeMatchers = new Map<Persona, ReturnType<typeof createRouteMatcher>>();

/**
 * Creates or returns cached route matcher for the given persona
 */
function isPublicRouteFor(
  persona: Persona,
): ReturnType<typeof createRouteMatcher> {
  if (!routeMatchers.has(persona)) {
    // eslint-disable-next-line security/detect-object-injection
    const paths = PUBLIC_PATHS[persona];

    routeMatchers.set(persona, createRouteMatcher(paths));
  }

  return routeMatchers.get(persona)!;
}

/**
 * Cached persona detection to avoid repeated string operations
 */
const personaCache = new Map<string, Persona>();

/**
 * Determines the persona (application section) based on subdomain with caching
 */
function getPersonaFromHostname(hostname: string): Persona {
  if (personaCache.has(hostname)) {
    return personaCache.get(hostname)!;
  }

  let persona: Persona = "user";

  if (hostname.startsWith("admin.")) {
    persona = "admin";
  } else if (hostname.startsWith("author.")) {
    persona = "author";
  }

  personaCache.set(hostname, persona);

  return persona;
}

/**
 * Main middleware function that handles multi-domain routing with internationalization and authentication
 */
export default clerkMiddleware(
  async (auth, request: NextRequest): Promise<NextResponse> => {
    // Skip processing for static files to improve performance
    const pathname = request.nextUrl.pathname;

    if (
      pathname.includes(".") &&
      !pathname.includes(".json") &&
      !pathname.includes(".html")
    ) {
      return NextResponse.next();
    }

    // First, apply subrouter middleware for subdomain routing and internationalization
    const subrouterResponse = subrouterMiddleware(request);
    // Handle authentication based on the original request's subdomain
    const hostname = request.headers.get("host");

    if (!hostname) {
      return subrouterResponse;
    }

    const cleanHostname = hostname.split(":")[0];
    const persona = getPersonaFromHostname(cleanHostname);
    // Check if route is public before doing expensive auth operations
    const isPublicRoute = isPublicRouteFor(persona);

    if (isPublicRoute(request)) {
      return subrouterResponse;
    }

    // Perform auth check for protected routes
    const { redirectToSignIn, userId } = await auth();

    if (!userId) {
      const signInResponse = redirectToSignIn();

      return NextResponse.redirect(signInResponse.url, signInResponse);
    }

    return subrouterResponse;
  },
  { debug: process.env.NODE_ENV === "development" },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
