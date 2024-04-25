import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  IsStrongPassword,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsStrongPassword()
  password: string;
  @IsInt()
  @Min(18)
  age: number;
  @IsEnum(Role)
  role: Role;
}
