import { headers } from "next/headers";
import { auth } from "../betterauth/auth";
import { NextResponse } from "next/server";

export async function sessionAuth() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user?.id) {
        return null;
    }
    
    return session;
}