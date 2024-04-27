import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Injectable()
export class DecksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDeckDto: CreateDeckDto) {
    return await this.databaseService.decks.create({
      data: createDeckDto,
      include: {
        trip: true,
      },
    });
  }

  async findAll() {
    return await this.databaseService.decks.findMany({
      include: {
        trip: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.decks.findUnique({
      where: { id },
      include: {
        trip: true,
      },
    });
  }

  async update(id: string, updateDeckDto: UpdateDeckDto) {
    return await this.databaseService.decks.update({
      where: { id },
      data: updateDeckDto,
      include: {
        trip: true,
      },
    });
  }

  async remove(id: string) {
    return this.databaseService.decks.delete({
      where: { id },
      include: {
        trip: true,
      },
    });
  }

  async deckMeetsRequirements(id: string, shipWidth: number) {
    const deck = await this.databaseService.decks.findUnique({
      where: { id },
    });
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return deck?.width >= shipWidth;
  }

  async deckIsFree(id: string) {
    const deck = await this.databaseService.decks.findUnique({
      where: { id },
      include: { trip: true },
    });
    return deck?.trip === null;
  }

  async parkShipInDeck(deckId: string, tripId: string) {
    const parkedShip = await this.databaseService.decks.update({
      where: { id: deckId },
      data: {
        trip: {
          connect: { id: tripId },
        },
      },
    });
    setTimeout(() => {
      this.unparkShipFromDeck(deckId, tripId);
    }, 20000);
    return parkedShip;
  }

  async unparkShipFromDeck(deckId: string, tripId: string) {
    return await this.databaseService.decks.update({
      where: { id: deckId },
      data: {
        trip: {
          disconnect: { id: tripId },
        },
      },
    });
  }
}
