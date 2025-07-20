import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

type Persona = "admin" | "author" | "user";
type Locale = "en" | "ja";

const intlMiddleware = createMiddleware(routing);
/**
 * Public paths configuration for each persona
 */
const PUBLIC_PATHS: Record<Persona, string[]> = {
  admin: [
    // "/",
    // "/:locale",
    "/:locale/sign-in(.*)",
    "/:locale/sign-up(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks(.*)",
  ],
  author: [
    // "/",
    // "/:locale",
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
    // "/:locale/about(.*)",
    // "/:locale/contact(.*)",
    // "/:locale/pricing(.*)",
    // "/about(.*)",
    // "/contact(.*)",
    // "/pricing(.*)",
  ],
};

/**
 * Creates a route matcher for the given persona
 */
function isPublicRouteFor(
  persona: Persona,
): ReturnType<typeof createRouteMatcher> {
  const paths = PUBLIC_PATHS[persona as keyof typeof PUBLIC_PATHS];

  return createRouteMatcher(paths);
}

/**
 * Extracts hostname without port number for local development compatibility
 */
function getCleanHostname(request: NextRequest): string {
  const hostname = request.headers.get("host") ?? "";

  return hostname.split(":")[0];
}

/**
 * Determines the persona (application section) based on subdomain
 */
function getPersonaFromHostname(hostname: string): Persona {
  if (hostname.startsWith("admin.")) return "admin";
  if (hostname.startsWith("author.")) return "author";

  return "user";
}

/**
 * Checks if a pathname has already been rewritten to prevent infinite loops
 */
function isAlreadyRewritten(pathname: string): boolean {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/author") ||
    pathname.startsWith("/user")
  );
}

/**
 * Extracts and validates locale from URL path segments
 */
function getLocaleFromPath(pathname: string): {
  isValid: boolean;
  locale: null | string;
  remainingSegments: string[];
} {
  const pathSegments = pathname.split("/").filter(Boolean);
  const locale = pathSegments[0] || null;
  const isValid = locale ? routing.locales.includes(locale as Locale) : false;
  const remainingSegments = isValid ? pathSegments.slice(1) : pathSegments;

  return { isValid, locale, remainingSegments };
}

/**
 * Constructs the rewrite path with persona injection
 */
function buildRewritePath(
  locale: string,
  persona: Persona,
  remainingPath?: string,
): string {
  const basePath = `/${locale}/${persona}`;

  return remainingPath ? `${basePath}/${remainingPath}` : basePath;
}

/**
 * Handles URL rewriting when locale is already present in the path
 */
function handleValidLocaleRewrite(
  request: NextRequest,
  locale: string,
  persona: Persona,
  remainingSegments: string[],
): NextResponse {
  const url = request.nextUrl.clone();
  const remainingPath = remainingSegments.join("/");
  const newPath = buildRewritePath(locale, persona, remainingPath || undefined);

  url.pathname = newPath;

  return NextResponse.rewrite(url);
}

/**
 * Handles URL rewriting when next-intl detects the locale
 */
function handleLocaleDetectionRewrite(
  request: NextRequest,
  persona: Persona,
): NextResponse {
  const response = intlMiddleware(request);

  // Check if next-intl performed a rewrite (locale detection)
  if (
    response instanceof NextResponse &&
    response.headers.get("x-middleware-rewrite")
  ) {
    const rewriteUrl = new URL(response.headers.get("x-middleware-rewrite")!);
    const { isValid, locale, remainingSegments } = getLocaleFromPath(
      rewriteUrl.pathname,
    );

    if (isValid && locale) {
      const remainingPath = remainingSegments.join("/");
      const newPath = buildRewritePath(
        locale,
        persona,
        remainingPath || undefined,
      );

      rewriteUrl.pathname = newPath;

      return NextResponse.rewrite(rewriteUrl);
    }
  }

  return response;
}

/**
 * Main middleware function that handles multi-domain routing with internationalization and authentication
 *
 * Routes requests based on hostname and locale:
 * - admin.domain.com/ja/path → /ja/admin/path
 * - author.domain.com/en/path → /en/author/path
 * - domain.com/ja/path → /ja/user/path
 */
export default clerkMiddleware(
  async (auth, request: NextRequest): Promise<NextResponse> => {
    const { pathname } = request.nextUrl;

    // Skip processing if already rewritten
    if (isAlreadyRewritten(pathname)) {
      return NextResponse.next();
    }

    const cleanHostname = getCleanHostname(request);
    const persona = getPersonaFromHostname(cleanHostname);
    // Protect routes using persona-specific public routes
    const isPublicRoute = isPublicRouteFor(persona);

    if (!isPublicRoute(request)) {
      const { redirectToSignIn, userId } = await auth();

      if (!userId) {
        const signInResponse = redirectToSignIn();

        return NextResponse.redirect(signInResponse.url, signInResponse);
      }
    }

    const {
      isValid: isValidLocale,
      locale,
      remainingSegments,
    } = getLocaleFromPath(pathname);

    if (isValidLocale && locale) {
      // Handle requests with valid locale in path
      return handleValidLocaleRewrite(
        request,
        locale,
        persona,
        remainingSegments,
      );
    } else {
      // Delegate locale detection to next-intl, then inject persona
      return handleLocaleDetectionRewrite(request, persona);
    }
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
