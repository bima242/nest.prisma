import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorators';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login user dan menghasilkan JWT token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'admin' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['username', 'password'],
    },
  })
  login(@Body() body: any) {
    return this.authService.login(body.username, body.password);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Registrasi user baru' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'siswa1' },
        password: { type: 'string', example: 'password123' },
        role: {
          type: 'string',
          example: 'ADMIN',
          enum: ['ADMIN', 'PETUGAS', 'SISWA'],
        },
        studentId: { type: 'number', example: 1, nullable: true },
      },
      required: ['username', 'password', 'role'],
    },
  })
  register(@Body() body: any) {
    return this.authService.register(
      body.username,
      body.password,
      body.role,
      body.studentId,
    );
  }
}
