import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IS_PUBLIC_KEY } from './public.decorators';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'rahasia-super-aman-ubah-ini-nanti',
    });
  }

  async validate(payload: any) {
    // Include studentId if it exists in the token
    return { 
      userId: payload.sub, 
      role: payload.role, 
      username: payload.username,
      studentId: payload.studentId 
    };
  }
}
