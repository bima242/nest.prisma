-- AlterTable: tambah dulu dengan default value
ALTER TABLE `Book` ADD COLUMN `publisher` VARCHAR(191) NOT NULL DEFAULT '';

-- Kalau mau hapus default setelah kolom terisi (opsional)
-- ALTER TABLE `Book` ALTER COLUMN `publisher` DROP DEFAULT;