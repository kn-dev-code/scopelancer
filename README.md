# Scopelancer

Scopelancer helps freelancers eliminate scope creep by turning a recorded client meeting into a structured, actionable artifact: a validated scope summary, an architecture diagram, and a ready-to-send follow-up email sequence.

Upload the recording of a client kickoff call. Scopelancer transcribes it, extracts the project's real scope and deadlines into a strict structured format, visualizes it as a diagram, and drafts a multi-day follow-up sequence in your own tone — so the scope you agreed to in the room is the scope that gets documented, diagrammed, and defended in writing.

This project doubles as a deliberate learning exercise in full-stack architecture and applied AI engineering. The codebase is being built incrementally, with an emphasis on understanding *why* each architectural decision was made, not just shipping features.

## How it works

1. **Upload** a recording of a client meeting (`.mp3`, `.m4a`, `.webm`, `.wav`, `.ogg`/`.opus`).
2. **Transcribe** — the audio is transcribed via Groq's hosted Whisper.
3. **Parse** — the transcript is mapped into a strict, validated JSON structure of project variables, scope, and deadlines (Node 1).
4. **Visualize** — the scope structure is turned into a Mermaid.js diagram via Claude Sonnet (Node 2).
5. **Draft** — a strategic, multi-day follow-up email sequence is written in the freelancer's own tone via Claude Sonnet (Node 3).
6. **Review** — results stream back into the dashboard in real time as each stage completes.

## Architecture at a glance

Scopelancer is split into two independently deployed services that will communicate over an authenticated internal API, unified by a single Postgres database as the source of truth.

```mermaid
flowchart LR
    Browser["Browser (Next.js UI)"]
    NextApp["Next.js App on Vercel"]
    SupabaseStorage["Supabase Storage"]
    SupabaseDb["Supabase Postgres"]
    AiService["FastAPI + LangGraph (Railway)"]
    Stripe["Stripe"]

    Browser -->|"RSC / fetch"| NextApp
    Browser -->|"Direct signed upload"| SupabaseStorage
    NextApp -->|"Prisma"| SupabaseDb
    NextApp -->|"Trigger run (internal secret)"| AiService
    AiService -->|"Fetch audio"| SupabaseStorage
    AiService -->|"Webhook callback"| NextApp
    NextApp -->|"Checkout Session"| Stripe
    Stripe -->|"checkout.session.completed"| NextApp
```

- **`app/web`** — Next.js (App Router). UI, auth, database access, and (soon) Stripe billing and pipeline orchestration all live here. This is the only service that talks to Postgres.
- **`app/ai`** — reserved for the FastAPI + LangGraph worker. A stateless service that will run the transcription-to-email pipeline as a durable state machine and report results back to `app/web` via webhook callbacks. Not started yet — currently an empty placeholder.

Full architectural rationale, data-flow diagrams, database schema design, the LangGraph pipeline design, and the billing model live in the project's planning docs and will be expanded as each phase is implemented.

## Tech stack

**Frontend / Backend**

- **Next.js 16** (App Router) — UI, Server Components, and API Route Handlers
- **shadcn/ui** + **Tailwind CSS v4** — component styling (Subframe integration is still planned but not yet wired in)
- **Vercel** — deployment target
- **Supabase (Postgres)** + **Prisma ORM 7** (via `@prisma/adapter-pg`) — database and schema management
- **Better Auth** (Prisma adapter) — authentication, with **email/password**, **Google OAuth**, and **GitHub OAuth** all enabled
- **TanStack Query** — client-side data fetching/caching for session and user state

**AI / Agentic pipeline** *(not started)*

- **Python** + **FastAPI** — service host
- **LangGraph** — sequential state-machine pipeline orchestration
- **Groq Whisper** — audio transcription (input gate)
- **Claude Sonnet** — scope-to-diagram (Mermaid.js) and scope-to-email generation

**Payments** *(scaffolded, not wired up)*

- **Stripe** — SDK installed and initialized; prepaid credit-wallet billing model designed (see the architecture plan) but the ledger schema, Checkout flow, and webhooks are not yet implemented.

## Repository structure

```
scopelancer/
  app/
    web/
      scopelancer/     # the actual Next.js app (App Router, Prisma, Better Auth, Stripe SDK)
    ai/                 # reserved for the FastAPI + LangGraph service — currently empty
```

Note: `app/web/scopelancer` has an extra nesting level from the initial `create-next-app` scaffold. It works fine as-is; flattening it is a cosmetic cleanup, not a blocker. There is no root-level `package.json`/workspace config yet tying `app/web` and `app/ai` together — that formal monorepo wiring is still pending.

## What's built so far

- **Auth**: Better Auth wired with the Prisma adapter, supporting email/password, Google OAuth, and GitHub OAuth. Session cookies, protected-route middleware (`/dashboard`, `/sessions`, `/billings`, `/profile`, `/plan`), and logout all work end-to-end.
- **Database schema (v1)**: `User`, `Admin`, `Session`, `Account`, `Verification` (Better Auth), plus a domain `AppSession` model (the app's "work session" concept, renamed to avoid clashing with Better Auth's `Session`) and an early, still-empty `Billing` stub.
- **API routes**: session creation (`POST /api/sessions/users`), current-user profile get/update, and role-gated admin profile get/update.
- **UI shell**: dashboard, sessions list, billing page, and a Stripe checkout placeholder page, all built on shared `NavBar`/`SideBar` components and shadcn primitives. Most data on these pages is currently hardcoded placeholder content (e.g. credit balances, session counts) pending real queries.

## What's next

Not started yet: audio upload to storage, the FastAPI/LangGraph service, the credit ledger schema, and live Stripe checkout/webhooks. See the project's architecture plan for the full phased roadmap and the current actionable checklist.

## Getting started

Setup instructions will be added once environment conventions (`.env.example` for each service) are finalized.
