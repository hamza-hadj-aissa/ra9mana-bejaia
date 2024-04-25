import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthTokensModule } from './auth-tokens/auth-tokens.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard, RolesGuard } from './common/guards';

const envFilePath =
  process.env.NODE_ENV === 'production' ? '.env' : '.env.development';
@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        name: 'global',
        ttl: 1000,
        limit: 3,
      },
    ]),
    LoggerModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
    }),
    AuthTokensModule,
  ],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
