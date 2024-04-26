import { Controller, Get, Param } from '@nestjs/common';
import { SpecialConditionService } from './special-condition.service';

@Controller('special-condition')
export class SpecialConditionController {
  constructor(
    private readonly specialConditionService: SpecialConditionService,
  ) {}

  // @Post()
  // create(@Body() createSpecialConditionDto: CreateSpecialConditionDto) {
  //   return this.specialConditionService.create(createSpecialConditionDto);
  // }

  @Get()
  findAll() {
    return this.specialConditionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialConditionService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSpecialConditionDto: UpdateSpecialConditionDto,
  // ) {
  //   return this.specialConditionService.update(id, updateSpecialConditionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.specialConditionService.remove(id);
  // }
}
