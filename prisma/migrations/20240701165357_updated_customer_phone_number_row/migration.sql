/*
  Warnings:

  - Changed the type of `phoneNumber` on the `customers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "phoneNumber",
ADD COLUMN     "phoneNumber" INTEGER NOT NULL;
