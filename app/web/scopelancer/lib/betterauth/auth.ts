import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "../generated/client"

const prisma = new PrismaClient();

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL!,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    rateLimit: {
        enabled: true,
        window: 10,
        max: 100,
    },
    sessions: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }
    },
    users: {
        additionalFields: {
            role: {
                type: "string",
                input: false
            }
        }
    }
})