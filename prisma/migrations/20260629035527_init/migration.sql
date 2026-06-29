/*
  Warnings:

  - You are about to drop the `Friend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Story` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoryTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoReaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoReport` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'VIDEO_REPORT';
ALTER TYPE "NotificationType" ADD VALUE 'VIDEO_TAG';

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_userId_fkey";

-- DropForeignKey
ALTER TABLE "StoryTag" DROP CONSTRAINT "StoryTag_storyId_fkey";

-- DropForeignKey
ALTER TABLE "StoryTag" DROP CONSTRAINT "StoryTag_taggedUserId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_subscribedToId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_subscriberId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoReaction" DROP CONSTRAINT "VideoReaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoReaction" DROP CONSTRAINT "VideoReaction_videoId_fkey";

-- DropForeignKey
ALTER TABLE "VideoReport" DROP CONSTRAINT "VideoReport_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoReport" DROP CONSTRAINT "VideoReport_videoId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "fcmToken" TEXT,
ALTER COLUMN "fullName" DROP NOT NULL;

-- DropTable
DROP TABLE "Friend";

-- DropTable
DROP TABLE "Story";

-- DropTable
DROP TABLE "StoryTag";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "Video";

-- DropTable
DROP TABLE "VideoReaction";

-- DropTable
DROP TABLE "VideoReport";

-- DropEnum
DROP TYPE "FriendStatus";

-- DropEnum
DROP TYPE "ReportReason";
