-- Fix: resolve the stuck migration 20260123070941_add_publisher_to_book
-- Mark it as successfully applied in _prisma_migrations so Prisma stops
-- blocking on it (P3009), then idempotently ensure the publisher column exists.

-- Step 1: Mark the failed migration as resolved
UPDATE `_prisma_migrations`
SET
  `finished_at`         = COALESCE(`finished_at`, NOW()),
  `applied_steps_count` = 1,
  `logs`                = NULL
WHERE `migration_name` = '20260123070941_add_publisher_to_book'
  AND `finished_at` IS NULL;

-- Step 2: Idempotently add the publisher column to the Book table
-- Uses a stored procedure for IF NOT EXISTS semantics (MySQL <8.0 compatible)
DROP PROCEDURE IF EXISTS _fix_ensure_publisher_column;
CREATE PROCEDURE _fix_ensure_publisher_column()
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
CALL _fix_ensure_publisher_column();
DROP PROCEDURE IF EXISTS _fix_ensure_publisher_column;
