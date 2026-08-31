import { prisma } from "@/lib/betterauth/auth";

async function main() {
  console.log("Searching for new Stripe products...");

  // Starter Pack
  await prisma.product.upsert({
    where: { id: "prod_VA7wa7vyx4vQE7" },
    update: {
      name: "Starter Pack",
      description: "~10 short sessions, Full pipeline access, Email support",
      credits: 1000,
    },
    create: {
      id: "prod_VA7wa7vyx4vQE7",
      name: "Starter Pack",
      description: "~10 short sessions, Full pipeline access, Email support",
      credits: 1000,
      price: {
        create: {
          id: "price_1U9ng8Coc1hbe64b6ZMRsO02",
          unitAmount: 1900,
          currency: "usd",
        },
      },
    },
  });

  // Studio Pack
  await prisma.product.upsert({
    where: { id: "prod_VA7xYB7USWZknW" },
    update: {
      id: "prod_VA7xYB7USWZknW",
      name: "Studio Pack",
      description:
        "~35 short sessions, Full pipeline access, Priority processing",
      credits: 3000,
    },
    create: {
      id: "prod_VA7xYB7USWZknW",
      name: "Studio Pack",
      description:
        "~35 short sessions, Full pipeline access, Priority processing",
      credits: 3000,
      price: {
        create: {
          id: "price_1U9nhaCoc1hbe64b0LTxFRlE",
          unitAmount: 4900,
          currency: "usd",
        },
      },
    },
  });

  // Agency Pack
  await prisma.product.upsert({
    where: { id: "prod_VA7z3kAODmkioX" },
    update: {
      id: "prod_VA7z3kAODmkioX",
      name: "Agency Pack",
      description: "~100 sessions, Team seats, Priority support",
      credits: 8000,
    },
    create: {
      id: "prod_VA7z3kAODmkioX",
      name: "Agency Pack",
      description: "~100 sessions, Team seats, Priority support",
      credits: 8000,
      price: {
        create: {
          id: "price_1U9nj2Coc1hbe64bL6Vd3bu0",
          unitAmount: 11900,
          currency: "usd",
        },
      },
    },
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
