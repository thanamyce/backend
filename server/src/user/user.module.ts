import { Module, OnModuleInit } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { InvitationModule } from 'src/invitation/invitation.module';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => InvitationModule),
    AuthModule // Handle circular dependency
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule,UserModule] // Export UserService and MongooseModule for circular dependency
})
export class UserModule implements OnModuleInit {
  constructor(private userService: UserService) {}

  async onModuleInit() {
    await this.userService.createAdmin();
  }
}
