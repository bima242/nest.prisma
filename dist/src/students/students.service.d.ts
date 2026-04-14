import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateStudentDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nis: string;
        email: string | null;
        kelas: string;
        jurusan: string;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nis: string;
        email: string | null;
        kelas: string;
        jurusan: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nis: string;
        email: string | null;
        kelas: string;
        jurusan: string;
    }>;
    update(id: number, dto: UpdateStudentDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nis: string;
        email: string | null;
        kelas: string;
        jurusan: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nis: string;
        email: string | null;
        kelas: string;
        jurusan: string;
    }>;
}
