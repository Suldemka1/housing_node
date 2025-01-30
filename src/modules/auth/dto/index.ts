import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

class AuthCredentialsDTO {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

class CreateAccountDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsPhoneNumber('RU')
  phone?: string;

  @IsString()
  password: string;
}

export { AuthCredentialsDTO, CreateAccountDTO };
