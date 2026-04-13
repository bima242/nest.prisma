-- Fix: Mark the failed migration as complete so Prisma can proceed
-- This resolves the P3009 error caused by finished_at = NULL on the failed record
UPDATE `_prisma_migrations`
SET
  `finished_at`         = NOW(),
  `applied_steps_count` = 1,
  `logs`                = NULL
WHERE `migration_name` = '20260123070941_add_publisher_to_book'
  AND `finished_at` IS NULL;

-- Idempotently ensure the publisher column exists on the Book table
-- Uses a stored procedure to achieve IF NOT EXISTS semantics (MySQL <8.0 compatible)
DROP PROCEDURE IF EXISTS add_publisher_column;
CREATE PROCEDURE add_publisher_column()
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
CALL add_publisher_column();
DROP PROCEDURE IF EXISTS add_publisher_column;
