import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import envFieldsNames from 'config/fields.env';
import { DatabaseService } from 'src/database/database.service';
import { JwtPayload } from 'src/types';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthTokensService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createOrUpdateAuthTokens(userId: string, token: string) {
    return await this.databaseService.jwt.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        token,
      },
      update: {
        token,
      },
    });
  }

  async findAuthTokensByUserId(userId: string) {
    return await this.databaseService.jwt.findUnique({
      where: {
        userId,
      },
    });
  }

  async findAuthTokensByToken(token: string) {
    return await this.databaseService.jwt.findUnique({
      where: {
        token,
      },
    });
  }

  async deleteRefreshToken(userId: string) {
    return await this.databaseService.jwt.delete({
      where: {
        userId,
      },
    });
  }

  async generateAuthTokens(user: User) {
    const jwt = await this.generateAccessToken(user);
    await this.createOrUpdateAuthTokens(user.id, jwt);
    return { jwt };
  }

  async generateAccessToken(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role as Role,
    };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get(envFieldsNames.jwt.SECRET),
      expiresIn: this.configService.get(envFieldsNames.jwt.EXP),
    });
  }
}
