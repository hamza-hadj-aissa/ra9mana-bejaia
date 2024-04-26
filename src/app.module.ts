import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthTokensModule } from './auth-tokens/auth-tokens.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard, RolesGuard } from './common/guards';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './users/users.module';
import { ShipsModule } from './ships/ships.module';
import { CargoTypeModule } from './cargo-type/cargo-type.module';
import { UrgencyModule } from './urgency/urgency.module';
import { SpecialConditionModule } from './special-condition/special-condition.module';
import { TripsModule } from './trips/trips.module';
import { DecksModule } from './decks/decks.module';

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
    }),
    AuthTokensModule,
    ShipsModule,
    CargoTypeModule,
    UrgencyModule,
    SpecialConditionModule,
    TripsModule,
    DecksModule,
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
