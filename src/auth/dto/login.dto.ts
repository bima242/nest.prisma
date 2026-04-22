import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'bimaja' })
  username!: string;

  @ApiProperty({ example: 'password222' })
  password!: string;
}