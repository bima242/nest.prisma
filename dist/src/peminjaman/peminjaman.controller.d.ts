import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
export declare class PeminjamanController {
    private readonly peminjamanService;
    constructor(peminjamanService: PeminjamanService);
    create(dto: CreatePeminjamanDto, req: any): Promise<{
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
    kembalikan(id: number, req: any): Promise<{
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
    findOne(id: number, req: any): Promise<{
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
