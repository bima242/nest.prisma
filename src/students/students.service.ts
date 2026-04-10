import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  // ================= CREATE =================
  async create(dto: CreateStudentDto) {
    const data = {
      ...dto,
      email: dto.email === '' ? null : dto.email,
    };

    try {
      return await this.prisma.student.create({
        data,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('NIS atau Email sudah terdaftar');
      }
      throw error;
    }
  }

  // ================= READ ALL =================
  async findAll() {
    return this.prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // ================= READ ONE =================
  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Student tidak ditemukan');
    }

    return student;
  }

  // ================= UPDATE =================
  async update(id: number, dto: UpdateStudentDto) {
    const data = {
      ...dto,
      email: dto.email === '' ? null : dto.email,
    };

    try {
      return await this.prisma.student.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('NIS atau Email sudah terdaftar');
      }

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Student tidak ditemukan');
      }

      throw error;
    }
  }

  // ================= DELETE =================
  async remove(id: number) {
    try {
      return await this.prisma.student.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Student tidak ditemukan');
      }
      throw error;
    }
  }
}
