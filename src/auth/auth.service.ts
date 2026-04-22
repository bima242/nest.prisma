import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

type Role = 'ADMIN' | 'PETUGAS' | 'SISWA';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    console.log('LOGIN ATTEMPT:', username);
    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
        include: { student: true },
      });
      if (!user) {
        throw new UnauthorizedException('Username atau password salah');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Username atau password salah');
      }

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
          studentId: user.studentId,
        },
      };
    } catch (error) {
      console.error('LOGIN ERROR:', error.message);
      console.error('LOGIN ERROR DETAIL:', error);
      throw error;
    }
  }

  async register(username: string, password: string, role: string, studentId?: number) {
    console.log('REGISTER ATTEMPT:', username);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const validRoles = ['ADMIN', 'PETUGAS', 'SISWA'];
      const roleUpper = role.toUpperCase();
      if (!validRoles.includes(roleUpper)) {
        throw new BadRequestException('Role tidak valid. Gunakan: ADMIN, PETUGAS, atau SISWA');
      }

      const roleEnum = roleUpper as Role;

      if (roleEnum === 'SISWA' && !studentId) {
        throw new BadRequestException('Untuk role SISWA, studentId wajib diisi');
      }

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
    } catch (error) {
      console.error('REGISTER ERROR:', error.message);
      console.error('REGISTER ERROR DETAIL:', error);
      throw error;
    }
  }

  async getAllUsers() {
    console.log('GET ALL USERS ATTEMPT');
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          username: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return users;
    } catch (error) {
      console.error('GET ALL USERS ERROR:', error.message);
      throw error;
    }
  }

  async findByUsername(username: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
          role: true,
        },
      });
      return user;
    } catch (error) {
      console.error('FIND BY USERNAME ERROR:', error.message);
      throw error;
    }
  }
}