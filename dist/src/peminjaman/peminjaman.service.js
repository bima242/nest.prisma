"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeminjamanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PeminjamanService = class PeminjamanService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, user) {
        let finalStudentId;
        if (user.role === 'SISWA') {
            if (!user.studentId) {
                throw new common_1.ForbiddenException('Akun siswa ini belum terhubung dengan data siswa. Hubungi admin.');
            }
            finalStudentId = user.studentId;
        }
        else {
            if (!dto.studentId) {
                throw new common_1.BadRequestException('studentId wajib diisi untuk admin/petugas');
            }
            finalStudentId = dto.studentId;
        }
        const buku = await this.prisma.book.findUnique({
            where: { id: dto.bookId },
        });
        if (!buku) {
            throw new common_1.NotFoundException(`Buku dengan ID ${dto.bookId} tidak ditemukan`);
        }
        const student = await this.prisma.student.findUnique({
            where: { id: finalStudentId },
        });
        if (!student) {
            throw new common_1.NotFoundException(`Student dengan ID ${finalStudentId} tidak ditemukan`);
        }
        const sedangDipinjam = await this.prisma.peminjaman.findFirst({
            where: {
                bookId: dto.bookId,
                tanggalKembali: null,
            },
        });
        if (sedangDipinjam) {
            throw new common_1.BadRequestException(`Buku "${buku.title}" sedang dipinjam oleh student lain`);
        }
        const data = {
            bookId: dto.bookId,
            studentId: finalStudentId,
        };
        if (dto.tanggalPinjam) {
            data.tanggalPinjam = new Date(dto.tanggalPinjam + 'T00:00:00.000Z');
        }
        if (dto.tanggalKembali) {
            data.tanggalKembali = new Date(dto.tanggalKembali + 'T00:00:00.000Z');
        }
        return this.prisma.peminjaman.create({
            data,
            include: {
                buku: { select: { title: true } },
                student: { select: { name: true } },
            },
        });
    }
    findAll() {
        return this.prisma.peminjaman.findMany({
            include: {
                buku: { select: { title: true } },
                student: { select: { name: true } },
            },
        });
    }
    async findOne(id, user) {
        const peminjaman = await this.prisma.peminjaman.findUnique({
            where: { id },
            include: {
                buku: { select: { title: true } },
                student: { select: { name: true, id: true } },
            },
        });
        if (!peminjaman) {
            throw new common_1.NotFoundException(`Peminjaman dengan ID ${id} tidak ditemukan`);
        }
        if (user.role === 'SISWA' && peminjaman.student.id !== user.studentId) {
            throw new common_1.ForbiddenException('Anda hanya bisa melihat peminjaman Anda sendiri');
        }
        return peminjaman;
    }
    async update(id, dto) {
        await this.findOne(id, { role: 'ADMIN', userId: 0 });
        const data = { ...dto };
        if (dto.tanggalPinjam !== undefined) {
            data.tanggalPinjam = new Date(dto.tanggalPinjam + 'T00:00:00.000Z');
        }
        if (dto.tanggalKembali !== undefined) {
            data.tanggalKembali = new Date(dto.tanggalKembali + 'T00:00:00.000Z');
        }
        return this.prisma.peminjaman.update({
            where: { id },
            data,
            include: {
                buku: { select: { title: true } },
                student: { select: { name: true } },
            },
        });
    }
    async remove(id) {
        await this.findOne(id, { role: 'ADMIN', userId: 0 });
        return this.prisma.peminjaman.delete({ where: { id } });
    }
    async kembalikan(id, user) {
        const peminjaman = await this.prisma.peminjaman.findUnique({
            where: { id },
            include: {
                buku: { select: { title: true } },
                student: { select: { name: true, id: true } },
            },
        });
        if (!peminjaman) {
            throw new common_1.NotFoundException(`Peminjaman dengan ID ${id} tidak ditemukan`);
        }
        if (user.role === 'SISWA' && peminjaman.student.id !== user.studentId) {
            throw new common_1.ForbiddenException('Anda hanya bisa mengembalikan buku yang Anda pinjam');
        }
        const hariIni = new Date().toISOString().split('T')[0];
        if (peminjaman.tanggalKembali) {
            return {
                message: `Buku telah dikembalikan pada ${peminjaman.tanggalKembali}`,
                peminjaman,
                sudahDikembalikan: true
            };
        }
        const updated = await this.prisma.peminjaman.update({
            where: { id },
            data: { tanggalKembali: hariIni },
            include: {
                buku: { select: { title: true } },
                student: { select: { name: true } },
            },
        });
        return {
            message: 'Buku berhasil dikembalikan',
            peminjaman: updated,
            sudahDikembalikan: false
        };
    }
    async getStatusBuku() {
        const semuaBuku = await this.prisma.book.findMany({
            select: {
                id: true,
                title: true,
            },
        });
        const peminjamanAktif = await this.prisma.peminjaman.findMany({
            where: {
                tanggalKembali: null,
            },
            select: {
                bookId: true,
                tanggalPinjam: true,
                student: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        const statusList = semuaBuku.map((buku) => {
            const dipinjam = peminjamanAktif.find((p) => p.bookId === buku.id);
            if (dipinjam) {
                return {
                    bookId: buku.id,
                    title: buku.title,
                    status: 'Sedang Dipinjam',
                    dipinjamOleh: dipinjam.student.name,
                    tanggalPinjam: dipinjam.tanggalPinjam.toISOString().split('T')[0],
                };
            }
            return {
                bookId: buku.id,
                title: buku.title,
                status: 'Tersedia',
                dipinjamOleh: null,
                tanggalPinjam: null,
            };
        });
        return statusList;
    }
};
exports.PeminjamanService = PeminjamanService;
exports.PeminjamanService = PeminjamanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PeminjamanService);
//# sourceMappingURL=peminjaman.service.js.map