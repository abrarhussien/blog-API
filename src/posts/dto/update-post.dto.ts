import { IsString } from "class-validator";

export class UpdatePostDto {
    @IsString()
    title;
    @IsString()
    body;
    @IsString()
    image;
}