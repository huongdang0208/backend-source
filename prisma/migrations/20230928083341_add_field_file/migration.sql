/*
  Warnings:

  - Added the required column `blogId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `File` ADD COLUMN `blogId` INTEGER NOT NULL,
    ADD COLUMN `categoryId` INTEGER NOT NULL;
