import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [
    UserModule,
    PostsModule,
    MongooseModule.forRoot('mongodb+srv://admin:zgudU81aR4cENyAI@cluster0.m9og4vf.mongodb.net/blog')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

