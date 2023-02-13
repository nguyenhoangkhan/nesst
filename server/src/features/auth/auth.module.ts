import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { FirebaseAuthStrategy } from 'src/share/firebase/firebase-auth.strategy';

function jwtModuleFactory(configService: ConfigService) {
  return {
    secret: configService.get<string>('SECRET_KEY'),
    signOptions: { expiresIn: configService.get<string>('EXPIRES_IN') },
  };
}
@Module({
  imports: [
    UserModule,
    PassportModule,
    PassportModule.register({ defaultStrategy: 'firebase-jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtModuleFactory,
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, FirebaseAuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
