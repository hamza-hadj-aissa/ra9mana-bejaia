import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ShipsModule } from 'src/ships/ships.module';

@Module({
  imports: [DatabaseModule, ShipsModule],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
