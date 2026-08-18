import { prisma } from "@/lib/betterauth/auth";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";
import { sessionAuth } from "@/lib/session-auth-check/session-auth";
import { NextRequest, NextResponse } from "next/server";

// Get session by search
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await sessionAuth();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }
        const findSession = await prisma.appSession.findUnique({
            where: { id },
        })

        if (!findSession) {
            return NextResponse.json({
                error: "Not Found"
            }, { status: HTTP_STATUS.NOT_FOUND })
        }

        return NextResponse.json({
            message: "Session retrieved successfully",
            sessionCard: findSession
        }, { status: HTTP_STATUS.OK })
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await sessionAuth()

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }
        const body = await request.json();
        const { title, description } = body;
        const updateSession = await prisma.appSession.update({
            where: { id: body.id },
            data: {
                title,
                description
            },
            select: {
                title: true,
                description: true
            }
        })
        return NextResponse.json(
            { message: "Session updated successful", updatedSession: updateSession },
            { status: HTTP_STATUS.OK }
        )
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    }

}