# Rexto - Multi-domain Next.js Application

A Next.js 15 application with internationalization and multi-domain architecture, supporting separate portals for admin, author, and public users.

## Features

- **Multi-domain Architecture**: Automatic routing based on hostname
- **Internationalization**: Support for English (`en`) and Japanese (`ja`) using `next-intl`
- **TypeScript**: Strict type checking with explicit return types
- **PWA Support**: Service worker functionality with Serwist
- **Code Quality**: ESLint, Prettier, Stylelint, and pre-commit hooks

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd rexto2

# Install dependencies
npm install

# Start development server
npm run dev
```

### Local Development with Multiple Domains

1. **Configure local domains** by editing your `hosts` file:

   ```txt
   127.0.0.1 rexto.com admin.rexto.com author.rexto.com
   ```

2. **Access different portals**:

   - Public site: `http://rexto.com:3000`
   - Admin portal: `http://admin.rexto.com:3000`
   - Author portal: `http://author.rexto.com:3000`

## Architecture

### Multi-domain Routing

The application uses middleware-based routing to serve different content based on the hostname:

```txt
admin.rexto.kkweb.io/ja/dashboard → /ja/admin/dashboard
author.rexto.kkweb.io/en/posts   → /en/author/posts
rexto.kkweb.io/ja/about          → /ja/user/about
```

### Directory Structure

```txt
src/
├── app/
│   └── [locale]/           # Internationalized routes
│       ├── admin/          # Admin portal pages
│       ├── author/         # Author portal pages
│       └── user/           # Public site pages
├── i18n/
│   └── routing.ts          # Locale configuration
├── middleware.ts           # Domain routing logic
└── env.ts                  # Environment validation
```

**Note**: Use parentheses `()` for Route Groups, not underscores `_` (e.g., `(dashboard)` not `_dashboard`).

## Development Commands

### Core Commands

```bash
npm run dev         # Start development server with Turbopack
npm run build       # Build production application
npm run start       # Start production server
npm run type-check  # TypeScript type checking
```

### Code Quality

```bash
npm run lint           # Run ESLint
npm run lint:fix       # Run ESLint with auto-fix
npm run lint:style     # Run Stylelint for CSS
npm run lint:secret    # Check for secrets with secretlint
npm run prettier       # Format code with Prettier
npm run lefthook       # Run all pre-commit checks
```

## Deployment on Vercel

### Domain Configuration

1. **Add domains** in Vercel project settings:

   - `rexto.kkweb.io` (main domain)
   - `admin.rexto.kkweb.io`
   - `author.rexto.kkweb.io`

2. **Configure DNS** with CNAME records:

   ```txt
   rexto.kkweb.io       CNAME cname.vercel-dns.com
   admin.rexto.kkweb.io CNAME cname.vercel-dns.com
   author.rexto.kkweb.io CNAME cname.vercel-dns.com
   ```

3. **Verify domains** through Vercel dashboard after DNS propagation.

### Environment Variables

Create `.env.local` for development and configure production environment variables in Vercel:

```bash
# Add your environment variables here
NEXT_PUBLIC_APP_URL=https://rexto.kkweb.io
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **TypeScript**: Strict configuration with explicit return types
- **Internationalization**: next-intl with locale-based routing
- **PWA**: Serwist for service worker functionality
- **Styling**: CSS Modules with Stylelint
- **Code Quality**: ESLint, Prettier, Lefthook pre-commit hooks
- **Environment**: T3 env validation with Zod

## Contributing

1. Follow the established code style (ESLint + Prettier configuration)
2. Use explicit TypeScript return types for all functions
3. Test multi-domain functionality locally before submitting
4. Run `npm run lefthook` to ensure all checks pass

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Vercel Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
