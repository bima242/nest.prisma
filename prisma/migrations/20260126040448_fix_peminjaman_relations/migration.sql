-- CreateTable
CREATE TABLE `Peminjaman` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `tanggalPinjam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggalKembali` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Peminjaman_bookId_studentId_tanggalPinjam_key`(`bookId`, `studentId`, `tanggalPinjam`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
