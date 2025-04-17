-- AlterTable
ALTER TABLE "users" ADD COLUMN     "activationLinkExp" TIMESTAMP(3),
ADD COLUMN     "resetCodeExp" TIMESTAMP(3);
