import { NextRequest, NextResponse } from "next/server";
import { auth, prisma } from "@/lib/betterauth/auth";
import { headers } from "next/headers";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";
import { sessionAuth } from "@/lib/session-auth-check/session-auth";


// GET /api/sessions/users
export async function GET(request:NextRequest) {
    const session = await sessionAuth();

    if (!session) {
        return NextResponse.json({error: "Unauthorized"}, {status: HTTP_STATUS.UNAUTHORIZED})
    }

    const getSessions = await prisma.appSession.findMany();

    if (!getSessions) {
        return NextResponse.json({error: "Not Found"}, {status: HTTP_STATUS.NOT_FOUND});
    }

    return NextResponse.json({message: "Sessions retrieved successfully", sessions: getSessions}, {status: HTTP_STATUS.OK})
}



// POST /api/sessions/users
export async function POST(request: NextRequest) {
    try {
        const session = await sessionAuth();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }
        const body = await request.json();
        const {title, description, clientName, companyName, sessionStatus} = body;
        if (!title) {
            return NextResponse.json({error: "Not Found"}, {status: HTTP_STATUS.NOT_FOUND})
        }
        const newSession = await prisma.appSession.create({
            data: {
                title,
                description,
                clientName,
                companyName,
                userId: session.user.id,
                sessionStatus: sessionStatus || "NOTSTARTED"
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
