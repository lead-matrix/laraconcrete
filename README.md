# Contractor Operating System™ — Master Enterprise SaaS Platform

![Contractor OS Banner](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Multi-Tenant](https://img.shields.io/badge/Architecture-Multi--Tenant-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Backend](https://img.shields.io/badge/Backend-Laravel%2012-red)
![Frontend](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-orange)

> **"We don't replace your employees. We replace the chaos between them."**

Contractor Operating System™ is a production-grade, multi-tenant SaaS platform engineered specifically for trade contractors and construction businesses. Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and a **Laravel 12 Clean Architecture** backend with PostgreSQL and Redis.

---

## 🎯 The North Star Philosophy

> **Contractor Operating System™ exists to eliminate operational chaos. Every feature, workflow, and architectural decision must make it easier for contractors to estimate accurately, schedule confidently, communicate clearly, protect their margins, and grow without relying on memory or spreadsheets. We are not building software. We are building the system contractors trust to run their business every day.**

### The Core Question
Every screen and workflow must answer one question:
> **"What problem is this solving for the contractor right now?"**

---

## 🛠️ The 8 Measurable Contractor Pain Points Solved

| # | Pain Point | Cost of the Pain | COS™ Solution |
|---|---|---|---|
| 1 | **Underpriced Estimates** | Margin erosion & jobs completed at a loss | Smart Estimator with hard floor profit margin locks |
| 2 | **Slow Payments & Cash Flow Gaps** | Jobs done with no money in the bank | Customer Portal with instant deposit collection on estimate approval |
| 3 | **Lost Documentation** | Liability exposure & lost legal disputes | Photo & Document Vault tagged to job ID, timestamp & crew |
| 4 | **Poor Scheduling & Crew Accountability** | Wasted mobilization & ghost time | Field Dispatch with GPS check-in/out confirmation |
| 5 | **Poor Customer Communication** | Cancellations & distrust | Customer Portal with 24/7 job status & message thread |
| 6 | **No Business Visibility** | Owner flying blind on revenue & margins | Mission Control — Morning Briefing, not endless charts |
| 7 | **Manual & Repetitive Workflows** | Owner doing $12/hr work instead of $200/hr work | Trigger-based automation engine |
| 8 | **Business Owner Burnout** | **Company stops when owner is unavailable** | **SOPs, delegated approvals, automated alerts & Business Pulse™** |

---

## 🌟 Signature Features

### 1. Business Pulse™ Morning Briefing
Every morning at 7:00 AM, the owner receives one concise briefing:
- Real-time active job counts and crew dispatch status
- Pending deposit collections ($)
- Expiring estimate alerts & margin protection triggers
- Weather risk forecasts for upcoming concrete pours
- Weekly estimated profit calculation

### 2. Business OS Health Score
A real-time health index (0–100) inspired by system diagnostics:
- **Documentation**: 100%
- **Cash Flow**: 82%
- **Scheduling**: 97%
- **Automation**: 45%
- **Customer Satisfaction**: 91%
- **Safety**: 88%

### 3. Smart Estimator & Margin Lock Safeguard
- Direct cost calculator (Materials, Labor, Equipment, Subcontractor)
- Overhead multiplier slider
- Hard profit margin lock (prevents submitting bids below cost floor)

### 4. Linear-Style Command Palette (`Cmd+K` / `Ctrl+K`)
- Rapid hotkey search across leads, estimates, active jobs, tenants, and roles.

### 5. Multi-Tenant & Granular RBAC Engine
- Isolated tenant environments per contractor business
- 8 pre-configured roles: `Platform Owner`, `Platform Admin`, `Business Owner`, `Office Manager`, `Project Manager`, `Crew Leader`, `Employee`, `Customer`.

### 6. Configurable Global Footer Attribution
- Subtle attribution: *Designed & Architected by Mahmudur R Bhuiyan — Architecting the Systems Behind Great Businesses.*
- **Configurable per tenant**: Toggleable by Platform Owner or Enterprise White-Label clients.

---

## 🏗️ Project Architecture

```
contractor-os/
├── backend/                             # Laravel 12 Backend Clean Architecture
│   ├── app/
│   │   ├── Http/Middleware/TenantMiddleware.php  # Multi-tenant header & domain guard
│   │   ├── Scopes/TenantScope.php       # Global Eloquent database isolation scope
│   │   └── Services/EstimatorService.php # Margin protection & quote calculation service
│   ├── database/migrations/             # PostgreSQL UUID migrations
│   └── README.md                        # Backend architecture blueprint
├── public/
│   ├── favicon.svg                      # COS™ vector icon
│   └── logo.svg                         # COS™ brand shield logo
├── src/
│   ├── components/
│   │   ├── layout/                      # Navbar & Footer with configurable attribution
│   │   └── ui/                          # CommandBar (Cmd+K) & BusinessHealthScore
│   ├── core/
│   │   ├── rbacContext.tsx              # Granular RBAC Provider & simulator
│   │   ├── tenantContext.tsx            # Multi-Tenant Provider & feature flags
│   │   └── types.ts                     # Core domain interfaces
│   ├── pages/
│   │   ├── MissionControl.tsx           # Morning Briefing & Business Pulse™
│   │   ├── CRMModule.tsx                # Sales Pipeline Kanban Board
│   │   ├── EstimatorModule.tsx          # Direct Cost & Margin Protection Engine
│   │   ├── ProjectsModule.tsx           # Field Dispatch & Crew Schedule Board
│   │   ├── CustomerPortal.tsx           # Estimate Approval & Deposit Simulator
│   │   ├── SuperAdminModule.tsx         # Platform Owner Control Center
│   │   └── NotFound.tsx                 # 404 Error View
│   └── test/                            # Vitest core architecture unit tests
```

---

## 🧪 Testing & Engineering Verification

```bash
# Run Automated Test Suite (Vitest)
npm run test

# TypeScript Strict Type Check
npm run type-check

# Code Quality & Linter (ESLint + Oxlint)
npm run lint

# Production Bundle Build (Vite)
npm run build
```

---

## ⚡ Engineering Commandments

1. **Every feature has an owner.**
2. **Every action is auditable.**
3. **Every permission is explicit.**
4. **Every workflow is automatable.**
5. **Every module is replaceable.**
6. **Every screen has a measurable purpose.**
7. **Every decision should survive ten years.**

---

## 📄 License & Attribution

Designed & Architected by **Mahmudur R Bhuiyan** — *Architecting the Systems Behind Great Businesses.*  
Copyright © 2026 Contractor Operating System™. All rights reserved.
