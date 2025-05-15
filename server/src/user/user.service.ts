import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { CreateUserDto } from './user.dto';
import { UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async createUser(user: CreateUserDto) {
    console.log(user)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const newUser = new this.userModel({
      ...user,
      password: hashPassword,
    });
    const createdUser = await newUser.save();
    if(createdUser){
        return {
            message:"User successfully created",
            firstName:createdUser.firstName,
            lastName:createdUser.lastName,
        }
    }
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const userobj:any = user.toObject();
    delete userobj.password;
    return userobj;
}

  async updateUser(dataToUpdate: UpdateUserDto,id:string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser:any = await this.userModel.findByIdAndUpdate(
      id,
      { $set: dataToUpdate },
      { new: true }
    );

    return updatedUser;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userobj:any = user.toObject();
    delete userobj.password;
    return userobj;
  }

  async deleteUser(id: string): Promise<{ deleted: boolean }> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userModel.deleteOne({ _id: id });
    return { deleted: true };
  }

  
  }
 




