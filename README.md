# 🛒 Prostore E-Commerce

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</div>

<br/>

> **A full-stack e-commerce project built to learn modern Next.js development end-to-end.**

This repository is intentionally learning-focused: each phase introduces new architecture and product capabilities while following real-world patterns for routing, authentication, data modeling, server actions, validation, and UI composition.

---

## 🎯 Project Purpose

This project exists to:
- 🛠️ **Practice full-stack Next.js development** with the App Router.
- 🏗️ **Learn architecture design** and evolve applications in phases.
- 📚 **Apply documentation-driven development** across the stack.
- 🚀 **Build production-style features** while understanding the tradeoffs behind each implementation.

---

## ✅ Current Status & Completed Phases

The core storefront, authentication, cart logic, and checkout flow are now complete and functional.

### 1. Foundation and Project Setup
- Next.js + React + TypeScript setup
- Tailwind CSS v4 and reusable UI primitives (Shadcn UI)
- Shared app structure and route groups
- Global theme provider and toast notifications

### 2. Product Catalog
- Home page with featured/latest products from database
- Product card grid and reusable price component
- Product details page with image gallery and stock status
- Loading and not-found page states

### 3. Authentication and User Session
- NextAuth v5 integration with Prisma adapter
- Credentials-based sign in and sign up (Password hashing with bcrypt)
- Session-aware header with user menu and sign out

### 4. Database and Data Layer
- Prisma schema with migrations (Product, User, Account, Session, VerificationToken, Cart, Order)
- PostgreSQL-backed data access through Prisma client (Neon Serverless)
- Seed pipeline with sample products and users

### 5. Cart Domain
- Add item to cart from product details
- Remove/decrement cart item logic
- Cart price calculation (items, shipping, tax, total)
- Session cart identifier support for guest/anonymous flows

### 6. Checkout & Order Flow
- Dedicated Cart page UI and summary
- Shipping address capture and validation
- Payment method selection
- Order review, placement, and order details pages

*(Note: some known issues related to the checkout flow are tracked in the project issue file and will be fixed in the near future.)*

---

## 🏗️ Architecture Overview

### 📁 Application Structure
| Directory | Purpose |
| --- | --- |
| `app/(root)` | Storefront routes, checkout flow, and shared shell |
| `app/(auth)` | Authentication routes and auth layout |
| `app/api/auth` | NextAuth handlers |
| `components/shared`| Domain-level UI (header, product, footer) |
| `components/ui` | Reusable base components (Shadcn) |
| `lib/actions` | Server actions for domain logic (product, user, cart, order) |
| `lib/validators` | Zod schemas for request/form validation |
| `db` / `prisma` | Prisma client wiring, schema, migrations, and seed data |

### 🔄 Request and Data Flow
1. **UI triggers** server actions (auth, product fetch, cart mutations).
2. **Inputs are validated** with Zod schemas.
3. **Prisma reads/writes** PostgreSQL models.
4. **UI updates** with server-rendered data and optimistic user feedback via toasts.

---

## 🚀 Upcoming Phases

The roadmap below captures the next planned iterations.

#### 1. Admin Capabilities
- Product management dashboard
- Order management and fulfillment
- User management and role-based access

#### 2. Search and Merchandising
- Search, filtering, sorting, and pagination
- Featured collections and category experience

#### 3. Quality and Production Hardening
- Unit / integration / end-to-end tests
- Error handling and observability improvements
- Deployment and environment hardening

---

## 💻 Local Development

### Prerequisites
- Node.js 20+
- A PostgreSQL database (e.g., Neon, Supabase, or local)

### 1. Clone & Install
```bash
npm install
```

### 2. Environment Variables
Create a `.env` or `.env.local` file in the root directory and add the following required variables:
```env
# Database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/prostore"

# NextAuth secret (generate using `openssl rand -base64 32`)
AUTH_SECRET="your-super-secret-auth-key"
```

### 3. Database Setup & Seeding
Push the Prisma schema to your database and seed it with mock data:
```bash
npx prisma db push
npx prisma db seed
```

### 4. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Learning Notes

This repository is a guided engineering exercise, not just a UI clone. The objective is to understand **why** each tool is used and how full-stack concerns connect across routing, auth, validation, persistence, and user experience.

*As new phases are completed, this README will be updated to keep progress, architecture, and priorities transparent.*
