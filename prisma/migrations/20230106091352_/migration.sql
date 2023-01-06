/*
  Warnings:

  - You are about to drop the column `deleteByAdminId` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `delete_at` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `deleteByAdminId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `delete_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `deleteByAdminId` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `delete_at` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `deleteByAdminId` on the `ProductInventory` table. All the data in the column will be lost.
  - You are about to drop the column `delete_at` on the `ProductInventory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Discount" DROP CONSTRAINT "Discount_deleteByAdminId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_deleteByAdminId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_deleteByAdminId_fkey";

-- DropForeignKey
ALTER TABLE "ProductInventory" DROP CONSTRAINT "ProductInventory_deleteByAdminId_fkey";

-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "deleteByAdminId",
DROP COLUMN "delete_at";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "deleteByAdminId",
DROP COLUMN "delete_at";

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "deleteByAdminId",
DROP COLUMN "delete_at";

-- AlterTable
ALTER TABLE "ProductInventory" DROP COLUMN "deleteByAdminId",
DROP COLUMN "delete_at";
