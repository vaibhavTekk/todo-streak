/*
  Warnings:

  - You are about to drop the column `score` on the `User` table. All the data in the column will be lost.
  - Added the required column `statsUserID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "score",
ADD COLUMN     "statsUserID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "currentStreak" INTEGER NOT NULL,
    "maxStreak" INTEGER NOT NULL,
    "prevStreak" INTEGER NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stats_userID_key" ON "Stats"("userID");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_statsUserID_fkey" FOREIGN KEY ("statsUserID") REFERENCES "Stats"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
