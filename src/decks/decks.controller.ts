import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  async create(@Body() createDeckDto: CreateDeckDto) {
    return await this.decksService.create(createDeckDto);
  }

  @Get()
  async findAll() {
    return await this.decksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.decksService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDeckDto: UpdateDeckDto) {
    return await this.decksService.update(id, updateDeckDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.decksService.remove(id);
  }
}
