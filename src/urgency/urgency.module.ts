import { Module } from '@nestjs/common';
import { UrgencyService } from './urgency.service';
import { UrgencyController } from './urgency.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UrgencyController],
  providers: [UrgencyService],
  exports: [UrgencyService],
})
export class UrgencyModule {}
