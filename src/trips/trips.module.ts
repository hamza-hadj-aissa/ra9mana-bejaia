import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CargoTypeModule } from 'src/cargo-type/cargo-type.module';
import { ShipsModule } from 'src/ships/ships.module';
import { SpecialConditionModule } from 'src/special-condition/special-condition.module';
import { UrgencyModule } from 'src/urgency/urgency.module';

@Module({
  imports: [
    DatabaseModule,
    CargoTypeModule,
    ShipsModule,
    SpecialConditionModule,
    UrgencyModule,
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
