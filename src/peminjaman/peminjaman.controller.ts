
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorators';

@Controller('peminjaman')
export class PeminjamanController {
  constructor(private readonly peminjamanService: PeminjamanService) {}

  // PINJAM BUKU → ADMIN, PETUGAS, SISWA (wajib token)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PETUGAS', 'SISWA')
  create(@Body() dto: CreatePeminjamanDto, @Request() req) {
    return this.peminjamanService.create(dto, req.user);
  }

  // KEMBALIKAN BUKU → ADMIN, PETUGAS, SISWA (wajib token)
  @Patch(':id/kembalikan')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PETUGAS', 'SISWA')
  kembalikan(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.peminjamanService.kembalikan(id, req.user);
  }

  // LIHAT SEMUA PEMINJAMAN → ADMIN & PETUGAS (wajib token)
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PETUGAS')
  findAll() {
    return this.peminjamanService.findAll();
  }

  // LIHAT DETAIL PEMINJAMAN → ADMIN & PETUGAS, SISWA hanya bisa melihat miliknya
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PETUGAS', 'SISWA')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.peminjamanService.findOne(id, req.user);
  }

  // UBAH PEMINJAMAN → ADMIN & PETUGAS (wajib token)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PETUGAS')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePeminjamanDto) {
    return this.peminjamanService.update(id, dto);
  }

  // HAPUS PEMINJAMAN → ADMIN (wajib token)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.peminjamanService.remove(id);
  }

  // STATUS BUKU → ADMIN & PETUGAS (wajib token)
  @Get('status-buku')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PETUGAS')
  getStatusBuku() {
    return this.peminjamanService.getStatusBuku();
  }
}

