# CryptoBookies

## Overview

CryptoBookies is a production-grade crypto betting comparison website designed to rank for crypto betting keywords and serve as a trusted crypto bookmaker comparison platform. The site compares crypto betting sites (sportsbooks and casinos) by trust scores, bonuses, KYC requirements, supported coins, payout speed, and regional eligibility.

The application follows a full-stack architecture with React frontend, Express backend, and PostgreSQL database.

## Recent Changes (January 2026)
- Complete implementation of all pages: Homepage, Sportsbooks, Casinos, Bookmaker Detail, Bonuses, Guides, Static pages
- Dark crypto-themed design with emerald/green primary color
- Trust score calculation algorithm with visual badges
- Database seeded with 23 real crypto bookmakers from Bitcoin.com
- **Replaced Replit Auth with traditional username/password admin authentication**
- Admin panel secured with custom authentication (bcrypt password hashing)
- All API endpoints implemented with proper authentication

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theming (light/dark mode support)
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Structure**: RESTful endpoints under `/api/` prefix
- **Authentication**: Traditional username/password admin authentication with bcrypt hashing
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

### Data Layer
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with Zod integration for schema validation
- **Schema Location**: `shared/schema.ts` defines all database tables
- **Migrations**: Drizzle Kit for database migrations (`drizzle-kit push`)

### Key Data Models
- **Bookmakers**: Crypto betting sites with trust scores, KYC levels, supported features
- **Bonuses**: Associated with bookmakers, includes type, status, promo codes
- **Guides**: Educational content with categories and FAQs
- **Coins**: Cryptocurrency support (BTC, ETH, USDT, etc.)
- **Regions**: Geographic restrictions for bookmakers
- **AdminUsers**: Admin accounts with bcrypt-hashed passwords (username, password_hash, email, role)
- **Sessions**: PostgreSQL-backed session storage

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: esbuild bundles server code, Vite builds client assets
- **Output**: `dist/` directory with `index.cjs` (server) and `public/` (client)

## External Dependencies

### Database
- PostgreSQL database (connection via `DATABASE_URL` environment variable)
- Drizzle ORM for queries and schema management

### Authentication
- Traditional username/password authentication with bcrypt password hashing
- Session management with express-session and connect-pg-simple
- Admin setup flow: first visitor to /admin/login creates the initial admin account

### UI/Frontend Libraries
- Radix UI primitives for accessible components
- Tailwind CSS for styling
- React Icons (cryptocurrency icons)
- Embla Carousel, React Day Picker, Vaul (drawer), cmdk (command palette)

### Required Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret for session encryption