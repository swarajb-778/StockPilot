-- AlterTable
ALTER TABLE "Products" ADD COLUMN "description" TEXT;
ALTER TABLE "Products" ADD COLUMN "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "Notifications" (
    "notificationId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("userId") ON DELETE SET NULL ON UPDATE CASCADE
);
