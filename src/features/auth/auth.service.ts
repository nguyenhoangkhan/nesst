import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { hashPassword, isCorrectPassword } from 'src/share/utils/bcrypt';
import { LoginUserDto, RegisterUserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

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

    // const user = await this.userService.findOne(email);

    // if (!user) {
    //   throw new HttpException('Token không hợp lệ', HttpStatus.UNAUTHORIZED);
    // }

    // return user;
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
}
