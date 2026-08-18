import { NextRequest, NextResponse } from "next/server";
import { auth, prisma } from "@/lib/betterauth/auth";
import { headers } from "next/headers";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";
import { sessionAuth } from "@/lib/session-auth-check/session-auth";

export async function POST(request: NextRequest) {
    try {
        const session = await sessionAuth();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: HTTP_STATUS.UNAUTHORIZED })
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

export async function PATCH(request: NextRequest) {
    try {
        const session = await sessionAuth();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }

        const body = await request.json();
        const { title, description } = body;

        const updateSession = await prisma.appSession.update({
            where: { id: body.id },
            data: {
                title, description
            },
            select: {
                title: true,
                description: true,
            }
        })

        return NextResponse.json({ message: "Session updated successfully", session: updateSession }, { status: HTTP_STATUS.OK })
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
}