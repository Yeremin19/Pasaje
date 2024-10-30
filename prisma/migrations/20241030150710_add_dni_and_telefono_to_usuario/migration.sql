/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dni` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `dni` VARCHAR(20) NOT NULL,
    ADD COLUMN `telefono` VARCHAR(9) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_dni_key` ON `Usuario`(`dni`);
