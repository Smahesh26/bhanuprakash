import { PrismaClient } from '@prisma/client';

// Use default constructor for Prisma 7+ (no options)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Fix for Prisma 7+: Use the default constructor with no options, and ensure your prisma.config.ts is valid.
export const prisma =
  globalForPrisma.prisma ?? new PrismaClient(); // No options for Prisma 7+

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
