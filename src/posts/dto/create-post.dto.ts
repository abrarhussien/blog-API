import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty({message:"title is required"})
    @IsString()
    title;
    @IsNotEmpty({message:"body is required"})
    @IsString()
    body;
    @IsNotEmpty({message:"image is required"})
    @IsString()
    image;
}
