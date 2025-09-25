# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm start` - Start development server on http://localhost:4200
- `npm test` - Run unit tests with Karma and Jasmine
- `npm run build` - Build application for production
- `npm run watch` - Build in watch mode for development

### Testing
- All components have corresponding `.spec.ts` files
- Run a single test file: `ng test --include='**/path-to-file.spec.ts'`
- Generate coverage report: `ng test --code-coverage`

## High-Level Architecture

This Angular v20 application follows a modular architecture with clear separation of concerns:

### Core Module (`src/app/core/`)
- **AuthService** (`services/auth.ts`): Manages authentication state using RxJS BehaviorSubject. Stores user in localStorage, provides login/logout methods, and tracks authentication status.
- **authGuard** (`guards/auth-guard.ts`): Functional guard that protects routes. Redirects unauthenticated users to login with returnUrl parameter.

### Feature Modules (`src/app/features/`)
Feature modules are lazy-loaded for optimal performance:

1. **Auth Module** (`auth/`): Contains login component with reactive forms. Mock authentication accepts any username/password.
2. **Dashboard Module** (`dashboard/`): Protected dashboard displaying user information. Only accessible after authentication.

### Routing Architecture
- Main routes defined in `app.routes.ts` with lazy loading
- Default route redirects to `/dashboard`
- Auth guard protects dashboard, redirecting to `/login` if unauthenticated
- Login preserves intended destination via `returnUrl` query parameter

### State Management
Currently uses service-based state management with RxJS:
- AuthService maintains authentication state with BehaviorSubject
- User data persisted in localStorage
- Components subscribe to auth state changes

### Form Handling
Uses Angular Reactive Forms with:
- FormBuilder for form construction
- Built-in validators for required fields
- Type-safe form controls

## Key Technical Patterns

1. **Standalone Components**: Root component uses standalone approach (modern Angular pattern)
2. **Dependency Injection**: Services use `providedIn: 'root'` for tree-shaking
3. **Lazy Loading**: Feature modules loaded on-demand via dynamic imports
4. **Functional Guards**: Uses functional guards instead of class-based guards
5. **Strict TypeScript**: Full strict mode enabled for type safety

## Project Configuration

- **TypeScript**: Strict mode with all type checking enabled
- **Angular Compiler**: Strict template type checking and injection parameters
- **Build Target**: ES2022 with modern JavaScript features
- **Testing**: Jasmine/Karma with Chrome launcher configured