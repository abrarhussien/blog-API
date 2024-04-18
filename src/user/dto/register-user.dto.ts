import { IsNotEmpty, IsString, Matches } from "class-validator";
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const mobileRegex=/^01[0125][0-9]{8}$/;

export class RegisterUserDto {
    @IsNotEmpty({message:"email is required"})
    @IsString()
    @Matches(emailRegex,{message:"email must be example@example.com"})
    email;
    @IsNotEmpty({message:"password is required"})
    @IsString()
    password;
    @IsNotEmpty({message:"user name is required"})
    @IsString()
    userName;
    // @IsNotEmpty({message:"phone number is required"})
    // @IsString()
    // @Matches(mobileRegex,{message:"phone number must be 01xxxxxxxxx"})
    // phone;

}
