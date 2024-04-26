import { Test, TestingModule } from '@nestjs/testing';
import { CargoTypeController } from './cargo-type.controller';
import { CargoTypeService } from './cargo-type.service';

describe('CargoTypeController', () => {
  let controller: CargoTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CargoTypeController],
      providers: [CargoTypeService],
    }).compile();

    controller = module.get<CargoTypeController>(CargoTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
