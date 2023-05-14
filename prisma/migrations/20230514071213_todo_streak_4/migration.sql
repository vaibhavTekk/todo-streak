-- AlterTable
ALTER TABLE "User" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Friendship" (
    "friendID" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("friendID")
);

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
