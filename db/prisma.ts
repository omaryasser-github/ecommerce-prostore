// db/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

// 1. Get the pooled connection string (starts with postgres://...-pooler...)
const connectionString = process.env.DATABASE_URL!;

// 2. ✅ NEW STANDARD: Pass config object directly. Do NOT use 'new Pool()'.
const adapter = new PrismaNeon({ connectionString });

// 3. ✅ NON-DEPRECATED GLOBAL PATTERN (Fixes 'any' type on globalThis)
const globalWithPrisma = globalThis as typeof globalThis & {
  prisma: PrismaClient;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ adapter });
} else {
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({ adapter });
  }
  prisma = globalWithPrisma.prisma;
}

export { prisma };   