import { Controller, Request, UseGuards } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common/enums';
import { responseBuilder } from 'src/share/builders/response.builder';
import { ResponseMessage } from 'src/share/constants/message.const';
import { RegisterUserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user = req.user;

    return this.authService.login(user.email);
  }

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
}
