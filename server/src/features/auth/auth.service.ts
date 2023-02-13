import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  BadRequestException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { hashPassword, isCorrectPassword } from 'src/share/utils/bcrypt';
import { LoginUserDto, RegisterUserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { DecodedIdToken } from './interfaces/google.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(email: string): Promise<any> {
    const accessToken = this._createToken(email);

    return {
      accessToken,
    };
  }

  async register(payload: RegisterUserDto) {
    const { email, password } = payload;

    const user = await this.userService.findOne(email);

    if (user) {
      throw new BadRequestException('Tài khoản đã tồn tại');
    }

    const hashedPassword = await hashPassword(password);

    const doc = await this.userService.createOne({
      ...payload,
      password: hashedPassword,
    });

    const accessToken = this._createToken(doc.email);

    return {
      accessToken,
    };
  }

  async validateUser({ email, password }): Promise<any> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }

    if (!isCorrectPassword(password, user.password)) {
      throw new BadRequestException('Tài khoản hoặc mật khẩu không chính xác');
    }

    return user;
  }

  private _createToken(email: string) {
    const accessToken = this.jwtService.sign(
      { email },
      { secret: process.env.SECRET_KEY },
    );

    return {
      expiresIn: process.env.EXPIRES_IN,
      accessToken,
    };
  }

  private async findByLogin({ email, password }: LoginUserDto) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }

    if (!isCorrectPassword(password, user.password)) {
      throw new BadRequestException('Tài khoản hoặc mật khẩu không chính xác');
    }

    return user;
  }
  async loginWithFirebaseGoogle(token: string): Promise<{
    access_token: string;
  }> {
    const decode = this.decodedIdToken(token);
    return this.handleProcessLoginGoogle(
      (decode as DecodedIdToken).email,
      decode as DecodedIdToken,
    );
  }

  async handleProcessLoginGoogle(
    email: string,
    options: DecodedIdToken,
  ): Promise<{
    access_token: string;
  }> {
    const isExitsAccount = await this.userService.findOne(email);

    if (isExitsAccount._id) {
      const payload = {
        username: isExitsAccount.email,
        sub: isExitsAccount._id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    const createUserObject = await this.userService.createWithGoogle(
      options as DecodedIdToken,
    );

    try {
      if (createUserObject === undefined || createUserObject === null)
        throw new BadRequestException('Register Login Google with error');

      const payload = {
        username: createUserObject.email,
        sub: createUserObject._id,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  decodedIdToken(token: string) {
    try {
      const decode = this.jwtService.decode(token);

      if (typeof decode === 'string')
        throw new UnauthorizedException('Token invalid');

      return decode;
    } catch (error) {
      throw error;
    }
  }
}
