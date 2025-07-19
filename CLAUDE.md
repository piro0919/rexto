# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run type-check` - TypeScript type checking without emit

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run lint:style` - Run Stylelint with auto-fix for CSS
- `npm run lint:secret` - Run secretlint to check for secrets
- `npm run prettier` - Format code with Prettier
- `npm run lefthook` - Run all pre-commit checks manually

### Git Hooks
The project uses Lefthook for pre-commit hooks that automatically run:
- ESLint with auto-fix
- Prettier formatting
- Stylelint for CSS
- TypeScript type checking
- Secretlint for security

## Architecture

### Multi-Tenant Structure
This is a Next.js application with a unique multi-tenant architecture using subdomains:

- **Public site**: `rexto.com` → routes to `src/app/_user/[locale]/`
- **Admin portal**: `admin.rexto.com` → routes to `src/app/_admin/[locale]/`  
- **Author portal**: `author.rexto.com` → routes to `src/app/_author/[locale]/`

The middleware (`src/middleware.ts`) handles subdomain routing by rewriting URLs to the appropriate app directory based on the hostname.

### Internationalization
- Uses `next-intl` for i18n support
- Supports English (`en`) and Japanese (`ja`) locales
- Default locale is English
- Routing configuration in `src/i18n/routing.ts`

### Key Technologies
- **Framework**: Next.js 15 with App Router
- **TypeScript**: Strict mode enabled
- **PWA**: Serwist for service worker functionality
- **Styling**: CSS Modules with strict linting
- **Environment**: T3 env validation with Zod
- **Path Aliases**: `@/*` maps to `src/*`

### Important Patterns
- Import navigation utilities from `@/i18n/navigation` instead of Next.js defaults
- Use type imports with inline syntax: `import { type Foo } from "./bar"`
- All filenames must follow camelCase, kebab-case, or PascalCase patterns
- CSS classes are validated and must be used (no unused classes allowed)
- Console.log and alert() are forbidden in production code

### Code Style
- Double quotes for strings
- Semicolons required
- Explicit function return types required
- Strict import/export sorting with perfectionist plugin
- No unused imports/variables allowed
- JSX props must be explicitly boolean (`loading={true}` not `loading`)