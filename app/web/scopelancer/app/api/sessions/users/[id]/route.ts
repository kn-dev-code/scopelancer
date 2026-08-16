import { HTTP_STATUS } from "@/lib/error_codes/error-code";
import { sessionAuth } from "@/lib/session-auth-check/session-auth";
import { NextRequest, NextResponse } from "next/server";

// Get session by search
export async function GET(request: NextRequest, {params} : {params: Promise<{id: string}>}) {
    sessionAuth();

    if (!sessionAuth) {
        return NextResponse.json({error: "Unauthorized"}, {status: HTTP_STATUS.UNAUTHORIZED})
    }
}