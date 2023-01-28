import { IsEmail, IsOptional } from "class-validator";


export class UpdateUsersDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsEmail()
  @IsOptional()
  password: string
}