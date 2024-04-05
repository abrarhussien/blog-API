import { IsNotEmpty, IsString, Matches } from "class-validator";
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export class LoginUserDto {
    @IsNotEmpty({message:"email is required"})
    @IsString()
    @Matches(emailRegex,{message:"email must be example@example.com"})
    email;
    @IsNotEmpty({message:"password is required"})
    @IsString()
    password;
}
