import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findOne(field: string) {
    const user = await this.userModel.findOne({ field });

    return user;
  }

  async findByLogin(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    return user;
  }

  async createOne(params: Partial<User> | any) {
    const doc = await this.userModel.create(params);
    return doc;
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async createWithGoogle(registerData: any) {
    const { email, full_name } = registerData;
    console.log('[createWithGoogle]', registerData);

    const createdUser = await this.createOne({
      email,
      full_name,
    });
    return createdUser;
  }
}
