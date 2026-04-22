import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorators';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login user dan menghasilkan JWT token' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Registrasi user baru' })
  register(@Body() body: RegisterDto) {
    return this.authService.register(
      body.username,
      body.password,
      body.role,
      body.studentId,
    );
  }
}