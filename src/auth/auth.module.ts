import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BcryptService } from 'src/shared/hashing/bcrypt.service';
import { HashingService } from 'src/shared/hashing/hashing.interface';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthTokensModule } from 'src/auth-tokens/auth-tokens.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, PassportModule, AuthTokensModule],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
