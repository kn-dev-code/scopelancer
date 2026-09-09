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
        { message: "Unauthorized" },
        { status: HTTP_STATUS.UNAUTHORIZED },
      );
    }
    const body = await request.json();
    const {
      clientFile,
      client,
      sessionTitle,
      context,
      deliverables,
      emailType,
    } = body;
    const updateSession = await prisma.appSession.update({
      where: { id, userId: session.user.id },
      data: {
        clientFile: clientFile,
        client: client,
        sessionTitle: sessionTitle,
        context: context,
        deliverables: deliverables,
        emailType: emailType,
      },
      select: {
        clientFile: true,
        client: true,
        sessionTitle: true,
        context: true,
        deliverables: true,
        emailType: true,
      },
    });
    if (!updateSession) {
      return NextResponse.json(
        { message: "Not Found" },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }
  } catch (e) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}

// DELETE /api/sessions/users/[id]

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const session = await sessionAuth();
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: HTTP_STATUS.UNAUTHORIZED },
    );
  }

  const deleteSession = await prisma.appSession.delete({
    where: { id },
  });

  if (!deleteSession) {
    return NextResponse.json(
      { message: "Not Found" },
      { status: HTTP_STATUS.NOT_FOUND },
    );
  }

  return NextResponse.json({ message: "Session Deleted" });
}
