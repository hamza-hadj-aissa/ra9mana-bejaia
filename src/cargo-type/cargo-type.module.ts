import { Module } from '@nestjs/common';
import { CargoTypeService } from './cargo-type.service';
import { CargoTypeController } from './cargo-type.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CargoTypeController],
  providers: [CargoTypeService],
  exports: [CargoTypeService],
})
export class CargoTypeModule {}
