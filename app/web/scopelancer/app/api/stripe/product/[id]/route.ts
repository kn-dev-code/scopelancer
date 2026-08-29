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

  const starterPack = await prisma.product.upsert({
    where: { id: "prod_VA7wa7vyx4vQE7" },
    update: { name: "Starter Pack", credits: 1000 },
    create: { id: "prod_VA7wa7vyx4vQE7", name: "Starter Pack", credits: 1000 },
  });

  const studioPack = await prisma.product.upsert({
    where: { id: "prod_VA7xYB7USWZknW" },
    update: { name: "Studio Pack", credits: 3000 },
    create: { id: "prod_VA7xYB7USWZknW", name: "Studio Pack", credits: 3000 },
  });

  const agencyPack = await prisma.product.upsert({
    where: { id: "prod_VA7z3kAODmkioX" },
    update: { name: "Agency Pack", credits: 8000 },
    create: { id: "prod_VA7z3kAODmkioX", name: "Agency Pack", credits: 8000 },
  });

  return NextResponse.json([starterPack, studioPack, agencyPack], {
    status: HTTP_STATUS.OK,
  });
}
