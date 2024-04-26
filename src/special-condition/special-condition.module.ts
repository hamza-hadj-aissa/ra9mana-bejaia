import { Module } from '@nestjs/common';
import { SpecialConditionService } from './special-condition.service';
import { SpecialConditionController } from './special-condition.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SpecialConditionController],
  providers: [SpecialConditionService],
  exports: [SpecialConditionService],
})
export class SpecialConditionModule {}
