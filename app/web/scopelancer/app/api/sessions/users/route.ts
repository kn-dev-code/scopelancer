import { NextRequest, NextResponse } from "next/server";
import { auth, prisma } from "@/lib/betterauth/auth";
import { getSession } from "better-auth/api";
import { headers } from "next/headers";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";

export async function POST(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: HTTP_STATUS.UNAUTHORIZED })
        }
        const body = await request.json();
        const newSession = await prisma.appSession.create({
            data: {
                title: body.title,
                description: body.description,
                userId: session.user.id,
                sessionStatus: body.sessionStatus || "NOTSTARTED"
            }
        })

        return NextResponse.json(
            { "success": true, "session": newSession },
            { status: HTTP_STATUS.CREATED })
    } catch (e) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
        )
    }
}