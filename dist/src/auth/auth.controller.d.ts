import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        access_token: string;
        user: {
            id: number;
            username: string;
            role: import("@prisma/client").$Enums.Role;
            studentId: number | null;
        };
    }>;
    register(body: any): Promise<{
        message: string;
        user: {
            id: number;
            username: string;
            role: import("@prisma/client").$Enums.Role;
            studentId: number | null;
        };
    }>;
}
