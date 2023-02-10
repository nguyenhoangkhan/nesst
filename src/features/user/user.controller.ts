import {
  Controller,
  Get,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { responseBuilder } from 'src/share/builders/response.builder';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    try {
      return req.user;
    } catch (err) {
      return responseBuilder(null, HttpStatus.CREATED, err.message, '');
    }
  }
}
