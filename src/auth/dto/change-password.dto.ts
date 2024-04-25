import { IsString, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  password: string;
  @IsStrongPassword()
  newPassword: string;
  @IsStrongPassword()
  confirmPassword: string;
}
