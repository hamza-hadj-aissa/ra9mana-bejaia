import { Test, TestingModule } from '@nestjs/testing';
import { CargoTypeService } from './cargo-type.service';

describe('CargoTypeService', () => {
  let service: CargoTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CargoTypeService],
    }).compile();

    service = module.get<CargoTypeService>(CargoTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
