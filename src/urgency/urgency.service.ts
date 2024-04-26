import { Injectable } from '@nestjs/common';
import { CreateUrgencyDto } from './dto/create-urgency.dto';
import { UpdateUrgencyDto } from './dto/update-urgency.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UrgencyService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUrgencyDto: CreateUrgencyDto) {
    return this.databaseService.urgency.create({
      data: createUrgencyDto,
    });
  }

  findAll() {
    return this.databaseService.urgency.findMany();
  }

  findOne(id: string) {
    return this.databaseService.urgency.findUnique({
      where: { id },
    });
  }

  update(id: string, updateUrgencyDto: UpdateUrgencyDto) {
    return this.databaseService.urgency.update({
      where: { id },
      data: updateUrgencyDto,
    });
  }

  remove(id: string) {
    return this.databaseService.urgency.delete({
      where: { id },
    });
  }
}
