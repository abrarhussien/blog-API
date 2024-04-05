import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from 'src/user/user.schema';
import { postModel } from './posts.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:"User",schema:userModel},{name:"post",schema:postModel}])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
