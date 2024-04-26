import { ConflictException, Injectable } from '@nestjs/common';
import { CargoTypeService } from 'src/cargo-type/cargo-type.service';
import { DatabaseService } from 'src/database/database.service';
import { ShipsService } from 'src/ships/ships.service';
import { SpecialConditionService } from 'src/special-condition/special-condition.service';
import { UrgencyService } from 'src/urgency/urgency.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(
    private readonly cargoTypeService: CargoTypeService,
    private readonly shipsService: ShipsService,
    private readonly specialConditionService: SpecialConditionService,
    private readonly urgencyService: UrgencyService,
    private readonly databaseService: DatabaseService,
  ) {}

  async create(createTripDto: CreateTripDto) {
    const cargoType = await this.cargoTypeService.findOne(
      createTripDto.cargoId,
    );
    const ship = await this.shipsService.findOne(createTripDto.shipId);
    const urgency = await this.urgencyService.findOne(createTripDto.urgencyId);
    if (!cargoType || !ship || !urgency) {
      throw new ConflictException('Invalid data');
    }
    return await this.databaseService.trip.create({
      data: createTripDto,
    });
  }

  async findAll() {
    return await this.databaseService.trip.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.trip.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    return await this.databaseService.trip.update({
      where: { id },
      data: updateTripDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.trip.delete({
      where: { id },
    });
  }
}
