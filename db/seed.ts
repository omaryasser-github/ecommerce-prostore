import { config } from "dotenv";
config({ path: ".env" });

// Correct import for custom output
import { PrismaClient } from "../lib/generated/prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  //  delete every thing in the product table and then create new products from the sample data
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seeded successfully!");
}

main();
