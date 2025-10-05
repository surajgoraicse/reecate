import env from '@/config/env.js';
import { PrismaClient } from '@/generated/prisma/index.js';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

// If your Prisma file is located elsewhere, you can change the path

// type Role = "ADMIN" | "USER" | "SUPERADMIN";



const prisma = new PrismaClient();
export const auth = betterAuth({
  user: {
    additionalFields: {
      role: {
        type : "string",
        required: true,
        default: "USER",
        input:false
      }
    }
  },
  trustedOrigins: [env.CLIENT],

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
});
