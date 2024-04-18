import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from 'src/auth.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() user: RegisterUserDto,@Res({passthrough:true}) response) {
    return this.userService.register(user,response);
  }
  @Post('login')
  login(@Body() user: LoginUserDto,@Res({passthrough:true}) response) {
    return this.userService.login(user,response);
  }
  @Post('username')
  validateUserName(@Body() username: string) {
    return this.userService.validateUserName(username);
  }

  @UseGuards(AuthGuard)
  @Get()
  getCurreentUser(@Req() request){
    return request.user
  }

}
