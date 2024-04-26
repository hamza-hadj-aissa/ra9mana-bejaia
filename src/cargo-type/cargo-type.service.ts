import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCargoTypeDto } from './dto/create-cargo-type.dto';
import { UpdateCargoTypeDto } from './dto/update-cargo-type.dto';

@Injectable()
export class CargoTypeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCargoTypeDto: CreateCargoTypeDto) {
    return await this.databaseService.cargoType.create({
      data: createCargoTypeDto,
    });
  }

  async findAll() {
    return await this.databaseService.cargoType.findMany();
  }

  async findOne(id: string) {
    return await this.databaseService.cargoType.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCargoTypeDto: UpdateCargoTypeDto) {
    return await this.databaseService.cargoType.update({
      where: { id },
      data: updateCargoTypeDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.cargoType.delete({
      where: { id },
    });
  }
}
