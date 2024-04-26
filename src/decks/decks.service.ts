import { Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DecksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDeckDto: CreateDeckDto) {
    return await this.databaseService.decks.create({
      data: createDeckDto,
      include: {
        trips: true,
      },
    });
  }

  async findAll() {
    return await this.databaseService.decks.findMany({
      include: {
        trips: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.decks.findUnique({
      where: { id },
      include: {
        trips: true,
      },
    });
  }

  async update(id: string, updateDeckDto: UpdateDeckDto) {
    return await this.databaseService.decks.update({
      where: { id },
      data: updateDeckDto,
      include: {
        trips: true,
      },
    });
  }

  async remove(id: string) {
    return this.databaseService.decks.delete({
      where: { id },
      include: {
        trips: true,
      },
    });
  }
}
