import { NextRequest, NextResponse } from "next/server";
import { auth, prisma } from "@/lib/betterauth/auth";
import { headers } from "next/headers";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";

// Get User
export async function GET(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        })

        if (!session) {
            return NextResponse.json({ error: "You must be logged in first" }, { status: HTTP_STATUS.UNAUTHORIZED })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id, 
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                createdAt: true,
            }
        })

        if (!user) {
            return NextResponse.json({error: "User not found."}, {status: HTTP_STATUS.NOT_FOUND});
        }
        
        return NextResponse.json({success: true, user: user}, {status: HTTP_STATUS.OK});


        
    } catch (e) {
        return NextResponse.json({
            error: "Internal Server Error",
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR
        })
    }

}