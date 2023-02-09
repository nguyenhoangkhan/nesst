import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { responseBuilder } from 'src/share/builders/response.builder';
import { ResponseMessage } from 'src/share/constants/message.const';
import { LoginUserDto, RegisterUserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() payload: RegisterUserDto) {
    try {
      const result = await this.authService.register(payload);
      return responseBuilder(
        result,
        HttpStatus.CREATED,
        ResponseMessage.success,
        '',
      );
    } catch (err) {
      return responseBuilder(null, HttpStatus.CREATED, err.message, '');
    }
  }

  @Post('login')
  async login(@Body() payload: LoginUserDto) {
    return await this.authService.login(payload);
  }
}
