import { Module } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { PeminjamanController } from './peminjaman.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PeminjamanController],
  providers: [PeminjamanService],
})
export class PeminjamanModule {}