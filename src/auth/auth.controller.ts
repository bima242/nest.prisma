import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: any) {
    console.log('👉 CONTROLLER MASUK LOGIN:', body);
    try {
      return await this.authService.login(body.username, body.password);
    } catch (err) {
      console.error('❌ CONTROLLER ERROR:', err);
      throw err;
    }
  }

  @Public()
  @Post('register')
  async register(@Body() body: any) {
    console.log('👉 CONTROLLER MASUK REGISTER:', body);
    try {
      return await this.authService.register(
        body.username,
        body.password,
        body.role,
        body.studentId,
      );
    } catch (err) {
      console.error('❌ CONTROLLER ERROR:', err);
      throw err;
    }
  }
}