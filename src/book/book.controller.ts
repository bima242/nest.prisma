import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorators';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'; // Tambahkan ini

@ApiTags('Books') // Kelompokkan ke folder Books di Swagger [cite: 96]
@ApiBearerAuth() // Aktifkan tombol Authorize untuk JWT [cite: 100-102]
@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Menambahkan buku baru (ADMIN only)' }) // Deskripsi [cite: 91, 97-99]
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'PETUGAS', 'SISWA')
  @ApiOperation({ summary: 'Menampilkan semua daftar buku' })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'PETUGAS', 'SISWA')
  @ApiOperation({ summary: 'Melihat detail buku berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'PETUGAS')
  @ApiOperation({ summary: 'Update sebagian data buku (ADMIN & PETUGAS)' })
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(+id, dto);
  }

  @Put(':id')
  @Roles('ADMIN', 'PETUGAS')
  @ApiOperation({ summary: 'Ganti seluruh data buku (ADMIN & PETUGAS)' })
  replace(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Menghapus buku (ADMIN only)' })
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}