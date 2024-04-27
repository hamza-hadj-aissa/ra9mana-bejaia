import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async create(
    @Body(
      new ValidationPipe({
        transform: true,
        // whitelist: true,
      }),
    )
    createTripDto: CreateTripDto,
  ) {
    const trip = await this.tripsService.create(createTripDto);
    return {
      id: trip?.id,
      departureDate: trip?.departureTime,
      arrivalDate: trip?.arrivalTime,
      parkingTime: trip?.parkingTime,
      ship: trip?.ship,
      deck: trip?.deck,
    };
  }

  @Get()
  async findAll() {
    return Promise.all(
      (await this.tripsService.findAll()).map((trip) => ({
        id: trip.id,
        departureDate: trip?.departureTime,
        arrivalDate: trip.arrivalTime,
        parkingTime: trip.parkingTime,
        ship: trip.ship,
        deck: trip.deck,
      })),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const trip = await this.tripsService.findOne(id);
    if (!trip) {
      throw new NotFoundException(`Trip with id ${id} not found`);
    }
    return {
      id: trip.id,
      departureDate: trip?.departureTime,
      arrivalDate: trip.arrivalTime,
      parkingTime: trip.parkingTime,
      ship: trip.ship,
      deck: trip.deck,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    updateTripDto: UpdateTripDto,
  ) {
    const trip = await this.tripsService.update(id, updateTripDto);
    return {
      id: trip.id,
      departureDate: trip?.departureTime,
      arrivalDate: trip.arrivalTime,
      parkingTime: trip.parkingTime,
      ship: trip.ship,
      deck: trip.deck,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      success: await this.tripsService.remove(id),
    };
  }
}
