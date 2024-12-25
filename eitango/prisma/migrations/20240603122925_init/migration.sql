/*
  Warnings:

  - You are about to alter the column `is_passed` on the `tango` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Boolean`.

*/
-- CreateTable
CREATE TABLE "user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tango" (
    "tango_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "phrase" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "registration_date" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "is_passed" BOOLEAN NOT NULL
);
INSERT INTO "new_tango" ("category", "is_passed", "meaning", "phrase", "registration_date", "tango_id", "updated_at", "user_id") SELECT "category", "is_passed", "meaning", "phrase", "registration_date", "tango_id", "updated_at", "user_id" FROM "tango";
DROP TABLE "tango";
ALTER TABLE "new_tango" RENAME TO "tango";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
