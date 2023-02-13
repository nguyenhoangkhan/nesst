import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { AuthService } from 'src/features/auth/auth.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    try {
      const invalidToken = this.authService.decodedIdToken(token);
      if (invalidToken.email_verified === false) {
        throw new UnauthorizedException('You must verified Email');
      }
      return token;
    } catch (error) {
      throw error;
    }
  }
}
