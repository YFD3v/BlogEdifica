/*
  Warnings:

  - You are about to drop the column `slug` on the `CategoryService` table. All the data in the column will be lost.
  - You are about to drop the column `catSlug` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CategoryNew" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "CategoryService" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "catSlug",
ALTER COLUMN "views" SET DEFAULT 0;
