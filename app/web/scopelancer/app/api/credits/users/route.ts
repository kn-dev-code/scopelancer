import { prisma } from "@/lib/betterauth/auth";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";
import { sessionAuth } from "@/lib/session-auth-check/session-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await sessionAuth();
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: HTTP_STATUS.UNAUTHORIZED },
    );
  }

  const credits = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      credits: true,
    },
  });

  if (!credits) {
    return NextResponse.json(
      { message: "User not found." },
      { status: HTTP_STATUS.NOT_FOUND },
    );
  }

  return NextResponse.json(
    { message: "Credits successfully retrieved", credits: credits },
    { status: HTTP_STATUS.OK },
  );
}

export async function PATCH(request: NextRequest) {
  const session = await sessionAuth();
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: HTTP_STATUS.UNAUTHORIZED },
    );
  }

  //const updateCredits = await prisma.user.update({})
}
