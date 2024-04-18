import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private UserModel,
    private jwt: JwtService,
  ) {}

  async login(user: LoginUserDto, res: Response) {
  try{
    let foundedUser = await this.UserModel.findOne({
      email: user.email.toLowerCase(),
    });
    if (!foundedUser) {
      res
        .status(HttpStatus.CONFLICT)
        .send("email doesn't exist, please register");
      return;
    }

    let checkPassword = await bcrypt.compare(
      user.password,
      foundedUser.password,
    );
    if (!checkPassword) {
      res.status(HttpStatus.CONFLICT).send('wrong Password');
      return;
    }

    let jwtData = await this.jwt.sign({
      email: user.email,
      name: foundedUser.userName,
      _id: foundedUser._id,
      isAdmin: foundedUser.isAdmin,
    });
    res.header('jwt', jwtData);

    return {
      message: 'loged in successfully',
      jwt: jwtData,
      user: foundedUser,
    };
    }catch(err){
     res.status(HttpStatus.BAD_REQUEST).send(err.message);
     return;
     }
  }

  async register(user: RegisterUserDto,res: Response) {
    user.email = user.email.toLowerCase();

    const foundedUser = await this.UserModel.findOne({ email: user.email });

    if (foundedUser){
      res
      .status(HttpStatus.CONFLICT)
      .send("email alreardy exists, please login");
    return;
    } 

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;

    const newUser = new this.UserModel(user);
    await newUser.save();

    return { message: 'add successfully', data: newUser };
  }

  async validateUserName(userName: string) {
    const foundedUser = this.UserModel.findOnd({ userName });
    if (foundedUser) return false;
    else return true;
  }
}
