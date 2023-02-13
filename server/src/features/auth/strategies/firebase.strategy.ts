import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(
  Strategy,
  'firebase-jwt',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    try {
      const invalidToken = this.authService.decodedIdToken(token);
      if (!invalidToken) {
        throw new UnauthorizedException('Token không hợp lệ');
      }
      return token;
    } catch (error) {
      throw error;
    }
  }
}
