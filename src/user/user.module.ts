import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from './user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { postModel } from 'src/posts/posts.schema';
import { PostsService } from 'src/posts/posts.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name :"User",schema:userModel}]),
    JwtModule.register({global:true,secret:'secret',signOptions:{expiresIn:"1d"}}),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
