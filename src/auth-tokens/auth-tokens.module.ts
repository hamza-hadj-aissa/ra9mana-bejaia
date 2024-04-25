import { Module } from '@nestjs/common';
import { AuthTokensService } from './auth-tokens.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, JwtModule.register({})],
  providers: [AuthTokensService],
  exports: [AuthTokensService],
})
export class AuthTokensModule {}
