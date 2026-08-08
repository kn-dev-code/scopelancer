import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies"

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request)
    const authRoutes = request.nextUrl.pathname.startsWith("/sign-in") || request.nextUrl.pathname.startsWith("/sign-up")
    const userRoutes = request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/profile")
        || request.nextUrl.pathname.startsWith("/plan")
    const sessionRoutes = request.nextUrl.pathname.startsWith("/sessions") || request.nextUrl.pathname.startsWith("/sessions/active")
        || request.nextUrl.pathname.startsWith("/sessions/completed")
    const billingRoutes = request.nextUrl.pathname.startsWith("/billings")
    // Stripe route later....
    const isProtectedRoutes = userRoutes || sessionRoutes || billingRoutes;

    if (isProtectedRoutes && !sessionCookie) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (authRoutes && sessionCookie) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        "/dashboard/:path*",
        "/sessions/:path*",
        "/sign-in",
        "/sign-up",
        "/profile/:path*",
        "/plan/:path*",
        "/billings/:path*",
    ],
};