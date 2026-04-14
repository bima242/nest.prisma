import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__BookClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        publisher: string;
        year: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateBookDto): import("@prisma/client").Prisma.Prisma__BookClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        publisher: string;
        year: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    replace(id: string, dto: UpdateBookDto): import("@prisma/client").Prisma.Prisma__BookClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        publisher: string;
        year: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__BookClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        author: string;
        publisher: string;
        year: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
