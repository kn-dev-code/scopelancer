import { prisma } from "@/lib/betterauth/auth";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";
import { sessionAuth } from "@/lib/session-auth-check/session-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await sessionAuth();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HTTP_STATUS.UNAUTHORIZED },
      );
    }

    const getUsers = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        credits: true,
      },
    });

    return NextResponse.json(
      {
        message: "User and credit logs retrieved successfully",
        users: getUsers,
      },
      { status: HTTP_STATUS.OK },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await sessionAuth();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HTTP_STATUS.UNAUTHORIZED },
      );
    }

    const body = await request.json();
    const { credits } = body;
    const getUsers = await prisma.user.updateMany({
      data: {
        ...credits(credits !== undefined && credits),
      },
    });
    return NextResponse.json(
      {
        message: "User and credit logs retrieved successfully",
        users: getUsers,
      },
      { status: HTTP_STATUS.OK },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}
