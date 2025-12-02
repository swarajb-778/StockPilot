import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData() {
  // Delete in correct order to respect foreign key constraints
  const deleteOrder = [
    "notifications",
    "expenseByCategory",
    "expenseSummary",
    "sales",
    "purchases",
    "salesSummary",
    "purchaseSummary",
    "expenses",
    "products",
    "users",
  ];

  for (const modelName of deleteOrder) {
    const capitalizedModel = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const model: any = prisma[capitalizedModel as keyof typeof prisma];
    if (model) {
      try {
      await model.deleteMany({});
        console.log(`Cleared data from ${capitalizedModel}`);
      } catch (error) {
        console.log(`Skipping ${capitalizedModel} - might not exist yet`);
      }
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  // Seed in correct order (respecting foreign key constraints)
  const orderedFileNames = [
    "products.json",
    "users.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "expenses.json",
    "expenseByCategory.json",
    "notifications.json",
  ];

  await deleteAllData();

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${fileName} - file not found`);
      continue;
    }
    
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const capitalizedModel = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const model: any = prisma[capitalizedModel as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      try {
      await model.create({
        data,
      });
      } catch (error) {
        console.error(`Error seeding ${modelName}:`, error);
      }
    }

    console.log(`Seeded ${capitalizedModel} with data from ${fileName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
