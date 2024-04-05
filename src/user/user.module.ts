import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from './user.schema';

@Module({
  imports:[MongooseModule.forFeature([{name :"User",schema:userModel}])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
