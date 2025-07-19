import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") ?? "";
  const cleanHostname = hostname.split(":")[0];

  // Check if already rewritten (prevent infinite loops)
  if (
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/author") ||
    url.pathname.startsWith("/user")
  ) {
    return NextResponse.next();
  }

  // Determine persona based on subdomain
  let persona = "user"; // default

  if (cleanHostname.startsWith("admin.")) {
    persona = "admin";
  } else if (cleanHostname.startsWith("author.")) {
    persona = "author";
  }

  // Get locale from URL (first segment)
  const pathSegments = url.pathname.split("/").filter(Boolean);
  const locale = pathSegments[0];
  // Check if locale is valid
  const isValidLocale = routing.locales.includes(locale as "en" | "ja");

  if (isValidLocale) {
    // Rewrite to persona path: /ja/xxx → /ja/_admin/xxx
    const remainingPath = pathSegments.slice(1).join("/");
    const newPath = remainingPath
      ? `/${locale}/${persona}/${remainingPath}`
      : `/${locale}/${persona}`;

    url.pathname = newPath;

    return NextResponse.rewrite(url);
  } else {
    // No locale in path, let next-intl handle locale detection first
    const response = intlMiddleware(request);

    // If next-intl adds a locale, we need to rewrite with persona
    if (
      response instanceof NextResponse &&
      response.headers.get("x-middleware-rewrite")
    ) {
      const rewriteUrl = new URL(response.headers.get("x-middleware-rewrite")!);
      const rewriteSegments = rewriteUrl.pathname.split("/").filter(Boolean);
      const detectedLocale = rewriteSegments[0];

      if (routing.locales.includes(detectedLocale as "en" | "ja")) {
        const remainingPath = rewriteSegments.slice(1).join("/");
        const newPath = remainingPath
          ? `/${detectedLocale}/${persona}/${remainingPath}`
          : `/${detectedLocale}/${persona}`;

        rewriteUrl.pathname = newPath;

        return NextResponse.rewrite(rewriteUrl);
      }
    }

    return response;
  }
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // - … already rewritten paths with personas
  matcher: "/((?!api|trpc|_next|_vercel|admin|author|user|.*\\..*).*)",
};
