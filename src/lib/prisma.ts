/**
 * This file is used to create a new Prisma client instance and export it. It resolve
 * the issue of creating multiple Prisma client instances when the application is running
 * in development mode.
 */

import { PrismaClient } from "@prisma/client";

declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
