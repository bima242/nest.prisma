import { IsString, IsInt, IsNotEmpty, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Tambahkan ini

export class CreateBookDto {
  @ApiProperty({ example: 'Laskar Pelangi', description: 'Judul buku' }) // Tambahkan ini
  @IsString()
  @IsNotEmpty({ message: 'Judul buku wajib diisi' })
  title: string;

  @ApiProperty({ example: 'Andrea Hirata', description: 'Penulis buku' })
  @IsString()
  @IsNotEmpty({ message: 'Penulis wajib diisi' })
  author: string;

  @ApiProperty({ example: 'Bentang Pustaka', description: 'Penerbit buku' })
  @IsString()
  @IsNotEmpty({ message: 'Penerbit wajib diisi' })
  publisher: string;

  @ApiProperty({ example: 2005, description: 'Tahun terbit' })
  @IsInt({ message: 'Tahun harus berupa angka' })
  @Min(1900, { message: 'Tahun minimal 1900' })
  @Max(2100, { message: 'Tahun maksimal 2100' })
  year: number;
}