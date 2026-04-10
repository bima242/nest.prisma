import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorators';
import { ApiTags, ApiOperation } from '@nestjs/swagger'; // Import ini [cite: 108]

@ApiTags('Auth') // Mengelompokkan ke kategori Auth [cite: 111]
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login user dan menghasilkan JWT token' }) // Deskripsi API [cite: 117]
  login(@Body() body: any) { // Sebaiknya gunakan DTO jika ada
    return this.authService.login(body.username, body.password);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Registrasi user baru' })
  register(@Body() body: any) {
    return this.authService.register(body.username, body.password, body.role, body.studentId);
  }
}