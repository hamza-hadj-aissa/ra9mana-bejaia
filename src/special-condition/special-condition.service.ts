import { Injectable } from '@nestjs/common';
import { CreateSpecialConditionDto } from './dto/create-special-condition.dto';
import { UpdateSpecialConditionDto } from './dto/update-special-condition.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SpecialConditionService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createSpecialConditionDto: CreateSpecialConditionDto) {
    return this.databaseService.specialCondition.create({
      data: createSpecialConditionDto,
    });
  }

  findAll() {
    return this.databaseService.specialCondition.findMany();
  }

  findOne(id: string) {
    return this.databaseService.specialCondition.findUnique({
      where: { id },
    });
  }

  update(id: string, updateSpecialConditionDto: UpdateSpecialConditionDto) {
    return this.databaseService.specialCondition.update({
      where: { id },
      data: updateSpecialConditionDto,
    });
  }

  remove(id: string) {
    return this.databaseService.specialCondition.delete({
      where: { id },
    });
  }
}
