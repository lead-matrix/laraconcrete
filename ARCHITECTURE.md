# ARCHITECTURE.md — Contractor Operating System™

> **Contractor Operating System™ exists to eliminate operational chaos. Every feature, workflow, and architectural decision must make it easier for contractors to estimate accurately, schedule confidently, communicate clearly, protect their margins, and grow without relying on memory or spreadsheets. We are not building software. We are building the system contractors trust to run their business every day.**

---

## The Question Every Screen Must Answer

> **"What problem is this solving for the contractor right now?"**

Not "what data can we display?" Not "what is technically impressive?" Not "what does our competitor have?"

Every screen, every component, every API endpoint must answer that single question. If it cannot, it does not ship.

---

## The 8 Measurable Contractor Pain Points

| # | Pain | Cost to Contractor | COS™ Solution |
|---|---|---|---|
| 1 | Underpriced estimates | Margin erosion — jobs completed at a loss | Smart Estimator with hard margin floor lock |
| 2 | Slow payments & cash flow gaps | Jobs done with no money in the bank | Customer Portal with instant deposit on approval |
| 3 | Lost documentation | Liability exposure, lost disputes | Document Vault tagged to job ID, crew, timestamp |
| 4 | Poor scheduling & crew accountability | Wasted mobilization, ghost time | Field Dispatch with GPS check-in/out confirmation |
| 5 | Poor customer communication | Cancellations, distrust, refund demands | Customer Portal with live job status and message thread |
| 6 | No business visibility | Owner flying blind on revenue, margins, pipeline | Mission Control — live Morning Briefing not charts |
| 7 | Manual repetitive workflows | Owner doing $12/hr work instead of $200/hr work | Automation Engine — trigger-based workflows |
| 8 | **Business Owner Burnout** | **Company slows or stops when owner is unavailable** | **SOPs, delegated approvals, automated alerts, Business Pulse™** |

### Pain #8 Is the Biggest

The owner is not just the decision-maker. In most contractor businesses under $5M/year, **the owner is the operating system.** They carry the estimates in their head, the schedule in their phone, the customer relationships in their memory.

COS™ must replace the owner's memory — not augment it. The moment Carlos can take a week off and the business runs without him is the moment this platform has delivered its core promise.

---

## Engineering Commandments

1. **Every feature has an owner.** Someone is accountable for it working correctly in production.
2. **Every action is auditable.** No mutation occurs without a timestamped, attributed record.
3. **Every permission is explicit.** No implicit access. Role + permission = access. Nothing else.
4. **Every workflow is automatable.** If a human does it more than twice, a trigger should be able to do it.
5. **Every module is replaceable.** Clean interfaces between layers — business logic never depends on framework internals.
6. **Every screen has a measurable purpose.** If the screen does not change a decision or trigger an action, it is waste.
7. **Every decision should survive ten years.** No clever hacks, no shortcuts that create future debt, no "we'll fix it later."

---

## Competitive Position

We do not compete with Jobber.
We do not compete with Buildertrend.
We do not compete with Housecall Pro.

**We compete with Chaos.**

Those tools give contractors more places to store data.
COS™ gives contractors clarity about what to do next.

---

## AI Philosophy

Do not market AI. Market decisions.

| Wrong | Right |
|---|---|
| "AI Estimate" | "Prevented a $1,870 underpriced quote" |
| "AI Scheduling" | "Avoided a crew conflict before it happened" |
| "AI Reports" | "Found $18,200 sitting in unpaid invoices" |

People do not buy AI. They buy better outcomes. Every AI-assisted feature must describe its outcome in dollar terms, hours saved, or risk eliminated.

---

## The Business Pulse™ Principle

Every morning at 7:00 AM, the owner receives one concise briefing that contains everything they need to know to run the day. Not a dashboard. Not a report. A **briefing**.

If the owner reads one thing today, it is Business Pulse™.

---

## Domain Architecture

```
Platform Layer (Super Admin)
│   Tenant provisioning, billing, feature flags, audit logs
│
└── Tenant Layer (Contractor Business)
    │   RBAC, branding, settings, integrations
    │
    ├── Operations Core
    │   ├── Mission Control (Morning Briefing)
    │   ├── Business Pulse™ (Daily digest)
    │   └── Business OS Health Score
    │
    ├── Revenue Engine
    │   ├── Smart Estimator (with margin lock)
    │   ├── Invoicing & Deposits
    │   └── Payment Tracking
    │
    ├── CRM & Pipeline
    │   ├── Lead Management
    │   ├── Sales Pipeline (Kanban)
    │   └── Customer Portal
    │
    ├── Field Operations
    │   ├── Job Dispatch & Scheduling
    │   ├── Crew Management & GPS Check-In
    │   ├── Daily Field Reports
    │   └── Change Order Workflow
    │
    ├── Document Intelligence
    │   ├── Photo Vault (tagged to job)
    │   ├── Contract & Permit Storage
    │   └── Compliance Checklist
    │
    └── Automation Engine
        ├── Trigger-Based Workflows
        ├── Notification Routing
        └── SOP Library
```

---

## Technology Stack

**Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui
**Backend**: Laravel 12 + PostgreSQL + Redis
**Queue**: Laravel Horizon (Redis-backed)
**Realtime**: Laravel Reverb (WebSockets)
**Storage**: S3-compatible (field photo vault)
**Payments**: Stripe (deposits, invoicing, milestone billing)
**Notifications**: Twilio (SMS) + Resend (transactional email)
**Auth**: Laravel Sanctum (API tokens) + RBAC guards

---

*Last updated: 2026-08-07 — Contractor Operating System™ v1.0 Foundation*
