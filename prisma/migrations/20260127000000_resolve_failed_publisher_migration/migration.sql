-- Resolve the failed migration 20260123070941_add_publisher_to_book
-- Mark it as applied in the _prisma_migrations table so Prisma stops blocking on it
UPDATE `_prisma_migrations`
SET
  `finished_at`      = COALESCE(`finished_at`, NOW()),
  `applied_steps_count` = 1,
  `logs`             = NULL
WHERE `migration_name` = '20260123070941_add_publisher_to_book'
  AND `finished_at` IS NULL;

-- Idempotently ensure the publisher column exists on the Book table
-- (handles the case where the original migration partially ran or did not run at all)
DROP PROCEDURE IF EXISTS ensure_publisher_column;
CREATE PROCEDURE ensure_publisher_column()
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
CALL ensure_publisher_column();
DROP PROCEDURE IF EXISTS ensure_publisher_column;
