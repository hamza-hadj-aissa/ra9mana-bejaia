import {
  Body,
  Controller,
  Delete,
  Get,
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
      trip,
      deckName: trip.deck.name,
      shipName: trip.ship.name,
    };
  }

  @Get()
  async findAll() {
    return await this.tripsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const trip = await this.tripsService.findOne(id);
    return {
      trip,
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
      trip,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      success: await this.tripsService.remove(id),
    };
  }
}
