import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from 'src/user/user.schema';
import { postModel } from './posts.schema';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[UserModule,MongooseModule.forFeature([{name:"User",schema:userModel},{name:"Post",schema:postModel}])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
