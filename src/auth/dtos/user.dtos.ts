import { IsString, Length, IsEmail } from 'class-validator';

export class RegisterUser {
  @IsEmail()
  email: string;

  @IsString()
  @Length(5)
  password: string;

  @IsString()
  name: string;

  @IsString()
  bio: string;

  @IsString()
  phone: string;
}
