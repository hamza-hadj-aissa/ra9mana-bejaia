import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DecksModule } from 'src/decks/decks.module';
import { ShipsModule } from 'src/ships/ships.module';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [DatabaseModule, ShipsModule, DecksModule],
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService],
})
export class TripsModule {}
