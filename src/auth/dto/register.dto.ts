import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'bimaja' })
  username!: string;

  @ApiProperty({ example: 'password222' })
  password!: string;

  @ApiProperty({ example: 'ADMIN' })
  role!: string;

  @ApiProperty({ example: 1, required: false })
  studentId?: number;
}