import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthTokensService } from 'src/auth-tokens/auth-tokens.service';
import { HashingService } from 'src/shared/hashing/hashing.interface';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
    private readonly authTokensService: AuthTokensService,
  ) {}
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
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

  async login(user: any) {
    return await this.authTokensService.generateAuthTokens(user);
  }
}
