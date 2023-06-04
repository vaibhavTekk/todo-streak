/*
  Warnings:

  - You are about to drop the column `statsUserID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_statsUserID_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "statsUserID",
ADD COLUMN     "currentStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prevStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Stats";
