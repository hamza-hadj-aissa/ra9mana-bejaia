import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTripDto: CreateTripDto) {
    const ship = await this.databaseService.ships.findUnique({
      where: { name: createTripDto.shipName },
    });
    if (!ship) {
      throw new NotFoundException('Ship not found');
    }
    const deck = await this.databaseService.decks.findUnique({
      where: { name: createTripDto.deckName },
    });
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return await this.databaseService.trip.create({
      data: {
        ...createTripDto,
        ship: { connect: { id: ship.id } },
        deck: { connect: { id: deck.id } },
      },
      include: {
        ship: true,
        deck: true,
      },
    });
  }

  async findAll() {
    return await this.databaseService.trip.findMany({
      include: {
        ship: true,
        deck: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.trip.findUnique({
      where: { id },
      include: {
        ship: true,
        deck: true,
      },
    });
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const ship = await this.databaseService.ships.findUnique({
      where: { name: updateTripDto.shipName },
    });
    if (!ship) {
      throw new NotFoundException('Ship not found');
    }
    const deck = await this.databaseService.decks.findUnique({
      where: { name: updateTripDto.deckName },
    });
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return await this.databaseService.trip.update({
      where: { id },
      data: updateTripDto,
      include: {
        ship: true,
        deck: true,
      },
    });
  }

  async remove(id: string) {
    return (
      (await this.databaseService.trip.delete({
        where: { id },
      })) !== null
    );
  }
}
