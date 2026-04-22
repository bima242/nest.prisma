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

    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    console.log('STEP 2: user:', user);

    if (!user) {
      throw new UnauthorizedException('Username atau password salah');
    }

    // 🔥 BYPASS BCRYPT (TEST)
    const isPasswordValid = password === user.password;

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
  }

  async register(
    username: string,
    password: string,
    role: string,
    studentId?: number,
  ) {
    console.log('REGISTER ATTEMPT:', username);

    // 🔥 SIMPAN TANPA HASH (BIAR MATCH SAMA LOGIN TEST)
    const hashedPassword = password;

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
}