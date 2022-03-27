import { IsString, Length, IsEmail } from 'class-validator';

export class RegisterUser {
  @IsEmail()
  email: string;

  @IsString()
  @Length(5)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
