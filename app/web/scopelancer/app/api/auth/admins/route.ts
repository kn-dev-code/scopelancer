import { auth, prisma } from "@/lib/betterauth/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";
import { sessionAuth } from "@/lib/session-auth-check/session-auth";
// GET api/admins/me
export async function GET(request: NextRequest) {
  try {
    const session = await sessionAuth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({
        error: "Unauthorized",
        status: HTTP_STATUS.UNAUTHORIZED,
      });
    }
    return NextResponse.json(
      {
        success: true,
        user: session.user,
      },
      { status: HTTP_STATUS.OK },
    );
  } catch (e) {
    return NextResponse.json({
      error: "Internal Server Error",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }
}

// PATCH api/admins/update
export async function PATCH(request: NextRequest) {
  const session = await sessionAuth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({
      error: "Unauthorized",
      status: HTTP_STATUS.UNAUTHORIZED,
    });
  }

  const body = await request.json();
  const { name, email, image, emailVerified, role } = body;

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: { name, email, image, emailVerified, role },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      emailVerfied: true,
      role: true,
    },
  });

  return NextResponse.json(
    { success: true, user: updatedUser },
    { status: HTTP_STATUS.OK },
  );
}
