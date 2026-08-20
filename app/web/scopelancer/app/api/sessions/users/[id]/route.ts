import { prisma } from "@/lib/betterauth/auth";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";
import { sessionAuth } from "@/lib/session-auth-check/session-auth";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// GET /api/sessions/users/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await sessionAuth();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: HTTP_STATUS.UNAUTHORIZED },
      );
    }
    const findSession = await prisma.appSession.findUnique({
      where: { id, userId: session.user.id },
    });

    if (!findSession) {
      return NextResponse.json(
        {
          error: "Not Found",
        },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    return NextResponse.json(
      {
        message: "Session retrieved successfully",
        sessionCard: findSession,
      },
      { status: HTTP_STATUS.OK },
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}

// PATCH /api/sessions/users/[id]
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await sessionAuth();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: HTTP_STATUS.UNAUTHORIZED },
      );
    }

    const findSession = await prisma.appSession.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!findSession) {
      return NextResponse.json(
        { error: "Not Found" },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    const body = await request.json();
    const { title, description, clientName, companyName } = body;
    const updateSession = await prisma.appSession.update({
      where: { id },
      data: {
        ...(title !== undefined && title),
        ...(description !== undefined && description),
        ...(clientName !== undefined && clientName),
        ...(companyName !== undefined && companyName),
      },
      select: {
        title: true,
        clientName: true,
        companyName: true,
        description: true,
        sessionStatus: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      { message: "Session update successfully", updatedSession: updateSession },
      { status: HTTP_STATUS.OK },
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}
