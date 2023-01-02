/*
  Warnings:

  - The `paymentType` column on the `UserPayment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('cash', 'card');

-- AlterTable
ALTER TABLE "UserPayment" DROP COLUMN "paymentType",
ADD COLUMN     "paymentType" "PaymentType" NOT NULL DEFAULT 'card';
