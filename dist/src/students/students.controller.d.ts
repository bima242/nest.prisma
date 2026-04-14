import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
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
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nis: string;
        email: string | null;
        kelas: string;
        jurusan: string;
    }>;
    updatePut(id: string, dto: UpdateStudentDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nis: string;
        email: string | null;
        kelas: string;
        jurusan: string;
    }>;
    updatePatch(id: string, dto: UpdateStudentDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        nis: string;
        email: string | null;
        kelas: string;
        jurusan: string;
    }>;
    remove(id: string): Promise<{
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
