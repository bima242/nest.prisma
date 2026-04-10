import { IsInt, IsDateString, IsOptional } from 'class-validator';

export class CreatePeminjamanDto {
  @IsInt()
  bookId: number;

  @IsInt()
  studentId: number;

  @IsDateString({}, { message: 'Tanggal pinjam harus dalam format YYYY-MM-DD atau ISO lengkap' })
  @IsOptional()
  tanggalPinjam?: string;

  @IsDateString({}, { message: 'Tanggal kembali harus dalam format YYYY-MM-DD atau ISO lengkap' })
  @IsOptional()
  tanggalKembali?: string;
}