import {
  BadRequestException,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { responseBuilder } from 'src/share/builders/response.builder';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('upload')
  async getProfile(file: Express.Multer.File) {
    try {
      return await this.cloudinaryService.uploadImage(file).catch(() => {
        throw new BadRequestException('Định dạng file không hợp lệ.');
      });
    } catch (err) {
      return responseBuilder(null, HttpStatus.OK, err.message, '');
    }
  }
}
