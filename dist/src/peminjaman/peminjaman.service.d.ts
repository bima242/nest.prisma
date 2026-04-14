import { PrismaService } from '../prisma/prisma.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
export declare class PeminjamanService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePeminjamanDto, user: any): Promise<{
        student: {
            name: string;
        };
        buku: {
            title: string;
        };
    } & {
        id: number;
        studentId: number;
        createdAt: Date;
        updatedAt: Date;
        bookId: number;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        student: {
            name: string;
        };
        buku: {
            title: string;
        };
    } & {
        id: number;
        studentId: number;
        createdAt: Date;
        updatedAt: Date;
        bookId: number;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    })[]>;
    findOne(id: number, user: any): Promise<{
        student: {
            id: number;
            name: string;
        };
        buku: {
            title: string;
        };
    } & {
        id: number;
        studentId: number;
        createdAt: Date;
        updatedAt: Date;
        bookId: number;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    }>;
    update(id: number, dto: UpdatePeminjamanDto): Promise<{
        student: {
            name: string;
        };
        buku: {
            title: string;
        };
    } & {
        id: number;
        studentId: number;
        createdAt: Date;
        updatedAt: Date;
        bookId: number;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        studentId: number;
        createdAt: Date;
        updatedAt: Date;
        bookId: number;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    }>;
    kembalikan(id: number, user: any): Promise<{
        message: string;
        peminjaman: {
            student: {
                name: string;
            };
            buku: {
                title: string;
            };
        } & {
            id: number;
            studentId: number;
            createdAt: Date;
            updatedAt: Date;
            bookId: number;
            tanggalPinjam: Date;
            tanggalKembali: Date | null;
        };
        sudahDikembalikan: boolean;
    }>;
    getStatusBuku(): Promise<({
        bookId: number;
        title: string;
        status: string;
        dipinjamOleh: string;
        tanggalPinjam: string;
    } | {
        bookId: number;
        title: string;
        status: string;
        dipinjamOleh: null;
        tanggalPinjam: null;
    })[]>;
}
