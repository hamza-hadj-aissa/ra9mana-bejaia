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
    });
  }

  async findAll() {
    return await this.databaseService.decks.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.decks.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateDeckDto: UpdateDeckDto) {
    return await this.databaseService.decks.update({
      where: { id },
      data: updateDeckDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.decks.delete({
      where: { id },
    });
  }
}
