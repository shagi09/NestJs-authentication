import {ExtractJwt, Strategy} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Replace with your actual secret
    });
  }

  async validate(payload: any) {
    // Here you can add additional validation logic if needed
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}