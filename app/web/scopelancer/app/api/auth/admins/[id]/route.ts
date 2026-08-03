import { auth, prisma } from "@/lib/betterauth/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { HTTP_STATUS } from "@/lib/error_codes/error-code";


// Delete User
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    const { id } = await params;

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: HTTP_STATUS.OK }
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}