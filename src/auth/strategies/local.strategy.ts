import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: configService.get('LOCAL_AUTH_USERNAME_FIELD'),
      passwordField: configService.get('LOCAL_AUTH_PASSWORD_FIELD'),
    });
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
