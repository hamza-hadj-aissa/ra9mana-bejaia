import { Controller, Get, Param } from '@nestjs/common';
import { CargoTypeService } from './cargo-type.service';

@Controller('cargo-types')
export class CargoTypeController {
  constructor(private readonly cargoTypeService: CargoTypeService) {}

  // @Post()
  // create(@Body() createCargoTypeDto: CreateCargoTypeDto) {
  //   return this.cargoTypeService.create(createCargoTypeDto);
  // }

  @Get()
  findAll() {
    return this.cargoTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargoTypeService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCargoTypeDto: UpdateCargoTypeDto,
  // ) {
  //   return this.cargoTypeService.update(id, updateCargoTypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cargoTypeService.remove(id);
  // }
}
