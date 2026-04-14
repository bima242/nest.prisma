import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBookDto): import("@prisma/client").Prisma.Prisma__BookClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        publisher: string;
        year: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        publisher: string;
        year: number;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__BookClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        publisher: string;
        year: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateBookDto): import("@prisma/client").Prisma.Prisma__BookClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        publisher: string;
        year: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__BookClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        publisher: string;
        year: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
