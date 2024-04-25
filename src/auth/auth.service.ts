import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthTokensService } from 'src/auth-tokens/auth-tokens.service';
import { HashingService } from 'src/shared/hashing/hashing.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly authTokensService: AuthTokensService,
  ) {}
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isPasswordValid = await this.hashingService.comparePassword(
        password,
        user.password,
      );
      if (isPasswordValid) {
        return user;
      } else {
        throw new UnauthorizedException('Invalid password');
      }
    }

    return null;
  }

  async register(user: CreateUserDto) {
    return await this.usersService.create(user);
  }

  async login(user: any) {
    return await this.authTokensService.generateAuthTokens(user);
  }

  async changePassword(id: number, password: string) {
    const hashedPassword = await this.hashingService.hashPassword(password);
    return await this.usersService.updatePassword(id, hashedPassword);
  }

  async refreshToken(id: number) {
    const user = await this.usersService.findOne(id, {
      include: ['refreshToken'],
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!user?.refreshToken) {
      throw new UnauthorizedException('Refresh token was revoked');
    }
    return await this.authTokensService.generateRefreshToken(user);
  }

  async logout(id: number) {
    return await this.authTokensService.deleteRefreshToken(id);
  }
}
