import { Injectable } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ShipsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createShipDto: CreateShipDto) {
    return this.databaseService.ships.create({
      data: createShipDto,
    });
  }

  findAll() {
    return this.databaseService.ships.findMany();
  }

  findOne(id: string) {
    return this.databaseService.ships.findUnique({
      where: { id },
    });
  }

  update(id: string, updateShipDto: UpdateShipDto) {
    return this.databaseService.ships.update({
      where: { id },
      data: updateShipDto,
    });
  }

  remove(id: string) {
    return this.databaseService.ships.delete({ where: { id } });
  }
}
