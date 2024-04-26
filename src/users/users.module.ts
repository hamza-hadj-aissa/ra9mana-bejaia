import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BcryptService } from 'src/shared/hashing/bcrypt.service';
import { HashingService } from 'src/shared/hashing/hashing.interface';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UsersService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
