import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

type Role = 'ADMIN' | 'PETUGAS' | 'SISWA';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ 
      where: { username },
      include: { student: true } // Include student data untuk dapat studentId
    });
    if (!user) {
      throw new UnauthorizedException('Username atau password salah');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Username atau password salah');
    }

    // Include studentId dalam payload JWT jika user adalah SISWA
    const payload: any = { sub: user.id, role: user.role, username: user.username };
    if (user.role === 'SISWA' && user.studentId) {
      payload.studentId = user.studentId;
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        studentId: user.studentId, // Include studentId dalam response
      },
    };
  }

  async register(username: string, password: string, role: string, studentId?: number) {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Validasi role
    const validRoles = ['ADMIN', 'PETUGAS', 'SISWA'];
    const roleUpper = role.toUpperCase();
    if (!validRoles.includes(roleUpper)) {
      throw new BadRequestException('Role tidak valid. Gunakan: ADMIN, PETUGAS, atau SISWA');
    }

    const roleEnum = roleUpper as 'ADMIN' | 'PETUGAS' | 'SISWA';

    // Jika role SISWA, studentId wajib diisi
    if (roleEnum === 'SISWA' && !studentId) {
      throw new BadRequestException('Untuk role SISWA, studentId wajib diisi');
    }

    // Validasi student exists jika studentId diberikan
    if (studentId) {
      const student = await this.prisma.student.findUnique({
        where: { id: studentId },
      });
      if (!student) {
        throw new NotFoundException(`Student dengan ID ${studentId} tidak ditemukan`);
      }
    }

    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: roleEnum,
        studentId: studentId || null,
      },
    }); 

    return {
      message: 'User berhasil dibuat',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        studentId: user.studentId,
      },
    };
  }

  // Method untuk mendapatkan semua user (cek username untuk semua role)
  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Jangan pilih password untuk keamanan!
      },
    });
    return users;
  }

  // Method untuk validasi username saja (tanpa password)
  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
    return user;
  }
}
