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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let StudentsService = class StudentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const data = {
            ...dto,
            email: dto.email === '' ? null : dto.email,
        };
        try {
            return await this.prisma.student.create({
                data,
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                throw new common_1.ConflictException('NIS atau Email sudah terdaftar');
            }
            throw error;
        }
    }
    async findAll() {
        return this.prisma.student.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const student = await this.prisma.student.findUnique({
            where: { id },
        });
        if (!student) {
            throw new common_1.NotFoundException('Student tidak ditemukan');
        }
        return student;
    }
    async update(id, dto) {
        const data = {
            ...dto,
            email: dto.email === '' ? null : dto.email,
        };
        try {
            return await this.prisma.student.update({
                where: { id },
                data,
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                throw new common_1.ConflictException('NIS atau Email sudah terdaftar');
            }
            if (error instanceof library_1.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw new common_1.NotFoundException('Student tidak ditemukan');
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.student.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError &&
                error.code === 'P2025') {
                throw new common_1.NotFoundException('Student tidak ditemukan');
            }
            throw error;
        }
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentsService);
//# sourceMappingURL=students.service.js.map