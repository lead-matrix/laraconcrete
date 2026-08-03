# Lara Concrete — Enterprise Construction SaaS & Estimating Platform

![Lara Concrete Banner](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Testing](https://img.shields.io/badge/Coverage-%3E80%25-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Vite](https://img.shields.io/badge/Build-Vite%206-orange)

A high-performance, mobile-optimized, enterprise-grade web platform and CAD estimating suite for **Lara Concrete LLC** (Wichita, KS). Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Vitest**, and a flexible **CMS Architecture** (Local Storage / Supabase ready).

---

## 🏗️ Core Features & Capabilities

- **Interactive 3D Visual CAD Estimator**: Real-time slab cost calculation with customizable length/width, PSI strength (3000–5000 PSI), rebar matrix spacing, finish styles (stamped, broom, acid stain), and instant PDF/quote generation.
- **AI Vision Estimator**: Upload site photographs for automated AI analysis and slope/excavation assessment.
- **Customer Portal & Project Password Verification**: Password-protected client project portals for viewing live job progress, structural schematics, and timeline updates.
- **Pluggable CMS Provider Architecture**: Decoupled data layer allowing seamless toggling between local client-side persistence and Supabase / backend API instances.
- **Local SEO Engine**: Automated city landing engine serving targeted Kansas service areas (Wichita, Andover, Derby, Maize, Goddard).
- **Enterprise Reliability**: Global React Error Boundaries, full 404 fallback routing, and zero-runtime-crash design.

---

## 🚀 Technology Stack

- **Core**: React 19, TypeScript (Strict Mode), Vite 6
- **Styling**: Tailwind CSS v4, Lucide Icons, Custom Glassmorphism & Smooth Animations
- **State & CMS**: Context API + Custom Provider Interface (`CMSProvider` abstraction)
- **Testing**: Vitest, React Testing Library, `@testing-library/jest-dom`, JSDOM environment
- **Linting & Code Quality**: ESLint (Flat Config), Oxlint, Prettier
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`)

---

## 🛠️ Project Architecture

```
src/
├── animations/         # Framer motion & CSS animation keyframes
├── cms/                # CMS Provider interface & LocalStorage implementation
│   ├── index.ts        # Provider contract definition
│   ├── localProvider.ts# In-browser persistent CMS implementation
│   └── useCMS.tsx      # React context hook & provider wrapper
├── components/
│   ├── layout/         # Navbar, Footer, Splash Loader
│   ├── sections/       # Hero, CAD Estimator, AI Vision, Contact, Testimonials, etc.
│   ├── strategy/       # ROI Calculator, Speed Slider, System Architecture diagrams
│   └── ui/             # Reusable UI primitives, ErrorBoundary, SEO Metadata
├── data/               # Default static site data & material pricing schemas
├── pages/              # Main route views (Home, AdminPortal, NotFound)
├── test/               # Vitest test suites, mock providers, and setup helpers
└── types/              # TypeScript interfaces & domain models
```

---

## 🧪 Testing & Code Quality

The repository enforces automated validation on every commit and pull request.

### Running Scripts

```bash
# Start Development Server
npm run dev

# Run Automated Test Suite (Vitest)
npm run test

# Run Tests in Watch Mode
npm run test:watch

# Generate Test Coverage Report
npm run test:coverage

# TypeScript Type Check
npm run type-check

# Code Linting (ESLint + Oxlint)
npm run lint

# Auto-Format Code (Prettier)
npm run format
npm run format:check

# Production Build
npm run build
```

---

## 🔌 CMS Provider Integration

The application uses an abstract `CMSProvider` interface defined in [`src/cms/index.ts`](file:///f:/GIT/Lara-concrete/src/cms/index.ts).

### Default Implementation: `LocalCMSProvider`

By default, the platform uses `LocalCMSProvider`, which stores and retrieves admin data directly from browser `localStorage` with fallback defaults.

### Connecting Supabase or Remote API

To switch to Supabase or a custom backend:

1. Implement the `CMSProvider` interface in a new file (e.g., `src/cms/supabaseProvider.ts`).
2. Instantiate your provider in `src/cms/useCMS.tsx`:

```typescript
const provider = new SupabaseCMSProvider(supabaseClient);
```

---

## 📱 Mobile Responsiveness & Accessibility

- **Breakpoint Support**: Fully responsive across mobile (320px–480px), tablet (768px), and desktop (1024px–1440px+).
- **Touch Targets**: All interactive buttons, selects, and form elements conform to WCAG 2.1 minimum 44×44px touch target guidelines.
- **Focus States**: High-contrast `#F58220` visible focus rings (`:focus-visible`) for complete keyboard navigation.
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` OS settings by disabling ambient background animations and high-frequency CSS keyframes.

---

## ⚙️ Environment Configuration

| Variable            | Description                                  | Default             | Required |
| :------------------ | :------------------------------------------- | :------------------ | :------- |
| `VITE_APP_TITLE`    | Application Title                            | `Lara Concrete LLC` | No       |
| `VITE_CMS_PROVIDER` | CMS Backend Provider (`local` \| `supabase`) | `local`             | No       |

---

## 📄 License

Copyright © 2026 Lara Concrete LLC. All rights reserved. Production code for Wichita, KS operations.
