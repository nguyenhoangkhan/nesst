import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './features/auth/auth.controller';
import { AuthModule } from './features/auth/auth.module';
import { UserController } from './features/user/user.controller';
import { UserModule } from './features/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Cloudinary } from './features/cloudinary/cloudinary';
import { CloudinaryService } from './features/cloudinary/cloudinary.service';
import { CloudinaryModule } from './features/cloudinary/cloudinary.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, Cloudinary, CloudinaryService],
})
export class AppModule {}
