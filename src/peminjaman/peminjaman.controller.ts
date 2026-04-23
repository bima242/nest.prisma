import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorators';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Peminjaman')
@ApiBearerAuth() // 🔥 INI YANG BIKIN MUNCUL GEMBOK
@Controller('peminjaman')
@UseGuards(JwtAuthGuard, RolesGuard) // 🔥 pindahin ke level controller (biar rapi)
export class PeminjamanController {
  constructor(private readonly peminjamanService: PeminjamanService) {}

  // PINJAM BUKU
  @Post()
  @Roles('ADMIN', 'PETUGAS', 'SISWA')
  create(@Body() dto: CreatePeminjamanDto, @Request() req) {
    return this.peminjamanService.create(dto, req.user);
  }

  // KEMBALIKAN BUKU
  @Patch(':id/kembalikan')
  @Roles('ADMIN', 'PETUGAS', 'SISWA')
  kembalikan(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.peminjamanService.kembalikan(id, req.user);
  }

  // LIHAT SEMUA
  @Get()
  @Roles('ADMIN', 'PETUGAS')
  findAll() {
    return this.peminjamanService.findAll();
  }

  // DETAIL
  @Get(':id')
  @Roles('ADMIN', 'PETUGAS', 'SISWA')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.peminjamanService.findOne(id, req.user);
  }

  // UPDATE
  @Patch(':id')
  @Roles('ADMIN', 'PETUGAS')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePeminjamanDto,
  ) {
    return this.peminjamanService.update(id, dto);
  }

  // DELETE
  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.peminjamanService.remove(id);
  }

  // STATUS BUKU
  @Get('status-buku')
  @Roles('ADMIN', 'PETUGAS')
  getStatusBuku() {
    return this.peminjamanService.getStatusBuku();
  }
}