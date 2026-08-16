import { NextRequest, NextResponse } from "next/server";
import { auth, prisma } from "@/lib/betterauth/auth";
import { headers } from "next/headers";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";


// Get all sessions
export async function GET(request: NextRequest, { params }: { params: Promise<String[]> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: HTTP_STATUS.UNAUTHORIZED }
        )
    }

    const getSessionCards = await prisma.appSession.findMany()

    if (getSessionCards.length === 0) {
        return NextResponse.json(
            { error: "No sessions found" },
            { status: HTTP_STATUS.NOT_FOUND }
        )
    }

    return NextResponse.json(
        { message: "Session card retrieval successful", sessionCards: { getSessionCards } },
        { status: HTTP_STATUS.OK }
    )
}

// Delete all cards
export async function DELETE(request: NextRequest, { params }: { params: Promise<String[]> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({
            error: "Unauthorized"
        }, { status: HTTP_STATUS.UNAUTHORIZED })
    }

    const deleteAllSessions = await prisma.appSession.deleteMany({});

    return NextResponse.json(
        {message: "Sessions deleted successfully", deletedSessionCards: {deleteAllSessions}},
        {status: HTTP_STATUS.OK}
    )
}

// Update all cards
export async function PATCH(request: NextRequest, {params} : {params: Promise<String[]>}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({
            error: "Unauthorized"
        }, { status: HTTP_STATUS.UNAUTHORIZED })
    }

    //const updateAllSessions = await prisma.appSession.updateMany(
        //where: {}
   // )
}