import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    UserModule,
    PostsModule,
    MongooseModule.forRoot('mongodb+srv://admin:zgudU81aR4cENyAI@cluster0.m9og4vf.mongodb.net/blog'),
    JwtModule.register({global:true,secret:'secret',signOptions:{expiresIn:"1d"}})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

