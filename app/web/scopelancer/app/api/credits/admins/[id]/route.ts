import { prisma } from "@/lib/betterauth/auth";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";
import { sessionAuth } from "@/lib/session-auth-check/session-auth";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = { params: Promise<{ id: string }> };
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await sessionAuth();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HTTP_STATUS.UNAUTHORIZED },
      );
    }

    const getUser = await prisma.user.findUnique({
      where: { id, userId: session.user.id },
      select: {
        credits: true,
      },
    });

    if (!getUser) {
      return NextResponse.json(
        { message: "Not Found" },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    return NextResponse.json(
      { message: "User credits retrieved successfully" },
      { status: HTTP_STATUS.OK },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const session = await sessionAuth();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: HTTP_STATUS.UNAUTHORIZED },
    );
  }

  const body = await request.json();
  const { credits } = body;
  const getUser = await prisma.user.update({
    where: { id },
    data: {
      ...credits(credits !== undefined && credits),
    },
    select: {
      credits: true,
    },
  });

  if (!getUser) {
    return NextResponse.json(
      { message: "Not found" },
      { status: HTTP_STATUS.NOT_FOUND },
    );
  }

  return NextResponse.json(
    { message: "User credits updated successfully" },
    { status: HTTP_STATUS.OK },
  );
}
