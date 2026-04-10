import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth-guard';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    PrismaModule,
    // Menggunakan registerAsync agar bisa membaca process.env [cite: 152-157]
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET, // Ambil dari .env [cite: 155]
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtStrategy, 
    JwtAuthGuard,
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}