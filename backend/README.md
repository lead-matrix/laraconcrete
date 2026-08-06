# Contractor Operating System™ — Laravel 12 Backend Architecture

## Overview
This backend repository contains the **Laravel 12 + PostgreSQL + Redis** Clean Architecture foundation for **Contractor Operating System™**.

The architecture follows strict **Domain-Driven Design (DDD)**, **Repository/Service Patterns**, **Event-Driven Processing**, and **Zero-Trust Multi-Tenancy**.

---

## Multi-Tenant Architecture & Isolation
Multi-tenancy is enforced from day one through:
1. **Tenant Middleware (`App\Http\Middleware\TenantMiddleware`)**: Intercepts requests, resolves tenant via `X-Tenant-ID` header or custom domain (`{tenant}.contractor-os.com`), and sets tenant context.
2. **Global Eloquent Scope (`App\Scopes\TenantScope`)**: Automatically appends `WHERE tenant_id = ?` to every query across all models.
3. **Database Security**: Foreign key constraints with indexed `tenant_id` UUID columns on all tables.

---

## Directory Structure
```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # API Resource Controllers
│   │   ├── Middleware/        # TenantMiddleware & RBACGuards
│   │   └── Requests/          # Form Request Validation
│   ├── Models/                # Eloquent Models with TenantScope
│   ├── Repositories/          # Repository Pattern Interfaces & Impls
│   ├── Services/              # Estimator, Dispatch, CRM Services
│   └── Scopes/                # TenantScope global query filter
├── database/
│   ├── migrations/            # PostgreSQL UUID migrations
│   └── seeders/               # Multi-Tenant demo seeders
└── routes/
    └── api.php                # RESTful API Endpoints
```

---

## Core Domain Services
- **EstimatorService**: Enforces profit margin safeguards and calculates direct costs + overhead multipliers.
- **TenantService**: Handles tenant provisioning, domain routing, and white-label branding configurations.
- **AuditLogService**: Async event-driven audit logger writing to Redis stream / PostgreSQL log tables.
