import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender, Role } from '../enum/user.enum';

export class CreateUserDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name cannot be empty' })
  first_name: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name cannot be empty' })
  last_name: string;

  @IsString({ message: 'Organization must be a string' })
  @IsNotEmpty({ message: 'Organization cannot be empty' })
  Organization: string;

  @IsEnum(Role, { message: 'Role must be either Admin or User' })
  role: Role;

  @IsEnum(Gender, { message: 'Gender must be either Male or Female' })
  gender: Gender;

  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
