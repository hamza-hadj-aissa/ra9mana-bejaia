import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  async create(@Body() createDeckDto: CreateDeckDto) {
    const deck = await this.decksService.create(createDeckDto);

    return {
      id: deck.id,
      name: deck.name,
      height: deck.height,
      width: deck.width,
      trip: deck.trip,
    };
  }

  @Get()
  async findAll() {
    return Promise.all(
      (await this.decksService.findAll()).map((deck) => ({
        id: deck.id,
        name: deck.name,
        height: deck.height,
        width: deck.width,
        trip: deck.trip,
      })),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const deck = await this.decksService.findOne(id);
    if (!deck) {
      throw new NotFoundException(`Deck with id ${id} not found`);
    }
    return {
      id: deck.id,
      name: deck.name,
      height: deck.height,
      width: deck.width,
      trip: deck.trip,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDeckDto: UpdateDeckDto) {
    const deck = await this.decksService.update(id, updateDeckDto);
    return {
      id: deck.id,
      name: deck.name,
      height: deck.height,
      width: deck.width,
      trip: deck.trip,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      success: (await this.decksService.remove(id)) !== null,
    };
  }
}
