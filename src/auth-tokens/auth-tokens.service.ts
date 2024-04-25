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

  async createOrUpdateAuthTokens(userId: number, token: string) {
    return await this.databaseService.refreshToken.upsert({
      create: {
        userId,
        token,
      },
      update: {
        token,
      },
      where: {
        userId,
      },
    });
  }

  async findAuthTokensByUserId(userId: number) {
    return await this.databaseService.refreshToken.findUnique({
      where: {
        userId,
      },
    });
  }

  async findAuthTokensByToken(token: string) {
    return await this.databaseService.refreshToken.findUnique({
      where: {
        token,
      },
    });
  }

  async deleteRefreshToken(userId: number) {
    return await this.databaseService.refreshToken.delete({
      where: {
        userId,
      },
    });
  }

  async generateAuthTokens(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role as Role,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get(envFieldsNames.jwt.ACCESS_TOKEN_SECRET),
      expiresIn: this.configService.get(
        envFieldsNames.jwt.ACCESS_TOKEN_EXPIRES_IN,
      ),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get(envFieldsNames.jwt.REFRSH_TOKEN_SECRET),
      expiresIn: this.configService.get(
        envFieldsNames.jwt.REFRESH_TOKEN_EXPIRES_IN,
      ),
    });
    await this.createOrUpdateAuthTokens(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async generateRefreshToken(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role as Role,
    };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get(envFieldsNames.jwt.REFRSH_TOKEN_SECRET),
      expiresIn: this.configService.get(
        envFieldsNames.jwt.REFRESH_TOKEN_EXPIRES_IN,
      ),
    });
    return await this.createOrUpdateAuthTokens(user.id, refreshToken);
  }
}
