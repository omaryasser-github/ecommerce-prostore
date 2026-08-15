# Prostore E-Commerce (Learning Project)

A full-stack e-commerce project built to learn modern Next.js development end-to-end.

This repository is intentionally learning-focused: each phase introduces new architecture and product capabilities while following real-world patterns for routing, authentication, data modeling, server actions, validation, and UI composition.

## Project Purpose

This project exists to:

- Practice full-stack Next.js development with App Router.
- Learn how to design and evolve application architecture in phases.
- Apply documentation-driven development across the stack.
- Build production-style features while understanding the tradeoffs behind each implementation.

## Current Status

The first iteration is complete and functional for core storefront, authentication, and cart logic.

### Completed Phases

1. Foundation and Project Setup

- Next.js + React + TypeScript setup
- Tailwind CSS v4 and reusable UI primitives
- Shared app structure and route groups
- Global theme provider and toast notifications

2. Product Catalog

- Home page with featured/latest products from database
- Product card grid and reusable price component
- Product details page with image gallery and stock status
- Loading and not-found page states

3. Authentication and User Session

- NextAuth v5 integration with Prisma adapter
- Credentials-based sign in and sign up
- Password hashing with bcrypt-ts-edge
- Session-aware header with user menu and sign out

4. Database and Data Layer

- Prisma schema with migrations for Product, User, Account, Session, VerificationToken, and Cart
- PostgreSQL-backed data access through Prisma client
- Seed pipeline with sample products and users

5. Cart Domain (Core Logic)

- Add item to cart from product details
- Remove/decrement cart item logic
- Cart price calculation (items, shipping, tax, total)
- Session cart identifier support for guest/anonymous flow

6. Shipping Address Flow

- Shipping address page and form added
- Address validation for shipping data
- Checkout step for collecting shipping information

Note: some known issues related to this flow are tracked in the project issue file and will be fixed in the near future.

## Architecture Overview

### Application Structure

- `app/(root)`: storefront routes and shared shell (header/footer)
- `app/(auth)`: authentication routes and auth layout
- `app/api/auth/[...nextauth]`: auth handlers
- `components/shared`: domain-level UI (header, product, footer)
- `components/ui`: reusable base components
- `lib/actions`: server actions for product, user, and cart domains
- `lib/validators`: Zod schemas for request/form validation
- `db` + `prisma`: Prisma client wiring, schema, migrations, seed data

### Request and Data Flow

1. UI triggers server actions (auth, product fetch, cart mutations).
2. Inputs are validated with Zod schemas.
3. Prisma reads/writes PostgreSQL models.
4. UI updates with server-rendered data and optimistic user feedback via toasts.

## Tech Stack

- Next.js (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- NextAuth v5
- Prisma ORM
- PostgreSQL
- Zod
- Sonner
- next-themes

## Upcoming Phases

The roadmap below captures the next planned iterations.

1. Cart Experience

- Dedicated cart page UI
- Full cart summary and edit workflow

2. Checkout Flow

- Shipping address capture
- Payment method selection
- Order review and placement

3. Orders

- Persisted order model and order creation flow
- User order history page
- Single order details page

4. Admin Capabilities

- Product management
- Order management
- User management and role-based access

5. Search and Merchandising

- Search, filtering, sorting, and pagination
- Featured collections and category experience

6. Quality and Production Hardening

- Unit/integration/end-to-end tests
- Error handling and observability improvements
- Deployment and environment hardening

## Known Gaps (Current Iteration)

These are expected and tracked as part of the learning roadmap:

- Cart route/UI is not fully implemented yet, though cart server logic exists.
- Checkout, orders, and admin flows are not implemented yet.
- Some naming/consistency and edge-case refinements are pending as cleanup tasks.

## Local Development

### Prerequisites

- Node.js 20+
- A PostgreSQL database


### Install and Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

### Build and Lint

```bash
npm run build
npm run start
npm run lint
```

## Learning Notes

This repository is a guided engineering exercise, not just a UI clone.
The objective is to understand why each tool is used and how full-stack concerns connect across routing, auth, validation, persistence, and user experience.

As new phases are completed, this README will be updated to keep progress, architecture, and priorities transparent.
