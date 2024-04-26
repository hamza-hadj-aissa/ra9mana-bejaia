import { Controller, Get, Param } from '@nestjs/common';
import { UrgencyService } from './urgency.service';

@Controller('urgency')
export class UrgencyController {
  constructor(private readonly urgencyService: UrgencyService) {}

  // @Post()
  // create(@Body() createUrgencyDto: CreateUrgencyDto) {
  //   return this.urgencyService.create(createUrgencyDto);
  // }

  @Get()
  findAll() {
    return this.urgencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urgencyService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUrgencyDto: UpdateUrgencyDto) {
  //   return this.urgencyService.update(id, updateUrgencyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.urgencyService.remove(id);
  // }
}
