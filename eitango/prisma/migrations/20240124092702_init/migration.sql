-- CreateTable
CREATE TABLE "metadata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tango" (
    "tango_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "phrase" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "registration_date" DATETIME NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "is_passed" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "metadata_key_key" ON "metadata"("key");
