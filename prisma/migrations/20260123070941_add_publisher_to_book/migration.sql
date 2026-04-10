-- AlterTable: Add publisher column to Book if it does not already exist
-- Using a stored procedure to achieve IF NOT EXISTS semantics (MySQL <8.0 compatible)
DROP PROCEDURE IF EXISTS add_publisher_to_book;
CREATE PROCEDURE add_publisher_to_book()
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME   = 'Book'
      AND COLUMN_NAME  = 'publisher'
  ) THEN
    ALTER TABLE `Book` ADD COLUMN `publisher` VARCHAR(191) NOT NULL DEFAULT '';
  END IF;
END;
CALL add_publisher_to_book();
DROP PROCEDURE IF EXISTS add_publisher_to_book;
