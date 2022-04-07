import { IsString, Length, IsEmail, IsOptional } from 'class-validator';

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

export class UpdateUser extends RegisterUser {
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  name: string;

  @IsOptional()
  bio: string;

  @IsOptional()
  phone: string;
}
