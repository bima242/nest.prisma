/*
  Warnings:

  - Added the required column `publisher` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE Book ADD COLUMN publisher VARCHAR(191);

UPDATE Book SET publisher = 'Unknown' WHERE publisher IS NULL;

ALTER TABLE Book MODIFY publisher VARCHAR(191) NOT NULL;
