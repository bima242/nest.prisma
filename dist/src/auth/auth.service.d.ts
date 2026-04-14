import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(username: string, password: string): Promise<{
        access_token: string;
        user: {
            id: number;
            username: string;
            role: import("@prisma/client").$Enums.Role;
            studentId: number | null;
        };
    }>;
    register(username: string, password: string, role: string, studentId?: number): Promise<{
        message: string;
        user: {
            id: number;
            username: string;
            role: import("@prisma/client").$Enums.Role;
            studentId: number | null;
        };
    }>;
    getAllUsers(): Promise<{
        id: number;
        username: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findByUsername(username: string): Promise<{
        id: number;
        username: string;
        role: import("@prisma/client").$Enums.Role;
    } | null>;
}
