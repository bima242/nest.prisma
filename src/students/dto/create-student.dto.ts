import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  nis: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  kelas: string;

  @IsString()
  @IsNotEmpty()
  jurusan: string;
}