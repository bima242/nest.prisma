import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

type Role = 'ADMIN' | 'PETUGAS' | 'SISWA';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    console.log('STEP 1: masuk login');

    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
      });

      console.log('STEP 2: user:', user);

      if (!user) {
        throw new UnauthorizedException('Username atau password salah');
      }

      // 🔥 sementara bypass password
      const isPasswordValid = true;
      console.log('STEP 3: password valid:', isPasswordValid);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Username atau password salah');
      }

      const payload: any = {
        sub: user.id,
        role: user.role,
        username: user.username,
      };

      console.log('STEP 4: sebelum sign JWT');
      console.log('JWT SECRET VALUE:', process.env.JWT_SECRET);

      const token = this.jwtService.sign(payload);

      console.log('STEP 5: token berhasil dibuat');

      return {
        access_token: token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          studentId: user.studentId,
        },
      };
    } catch (err) {
      console.error('❌ SERVICE ERROR:', err);
      throw err;
    }
  }

  async register(
    username: string,
    password: string,
    role: string,
    studentId?: number,
  ) {
    console.log('REGISTER ATTEMPT:', username);

    try {
      const validRoles = ['ADMIN', 'PETUGAS', 'SISWA'];
      const roleUpper = role.toUpperCase();

      if (!validRoles.includes(roleUpper)) {
        throw new BadRequestException(
          'Role tidak valid. Gunakan: ADMIN, PETUGAS, atau SISWA',
        );
      }

      const roleEnum = roleUpper as Role;

      if (roleEnum === 'SISWA' && !studentId) {
        throw new BadRequestException(
          'Untuk role SISWA, studentId wajib diisi',
        );
      }

      if (studentId) {
        const student = await this.prisma.student.findUnique({
          where: { id: studentId },
        });

        if (!student) {
          throw new NotFoundException(
            `Student dengan ID ${studentId} tidak ditemukan`,
          );
        }
      }

      const user = await this.prisma.user.create({
        data: {
          username,
          password, // sementara tanpa hash
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
    } catch (err) {
      console.error('❌ REGISTER ERROR:', err);
      throw err;
    }
  }
}