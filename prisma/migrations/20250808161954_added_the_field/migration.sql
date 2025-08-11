/*
  Warnings:

  - Added the required column `clerkId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Video" ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "public"."User"("clerkId");

-- AddForeignKey
ALTER TABLE "public"."Video" ADD CONSTRAINT "Video_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "public"."User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
