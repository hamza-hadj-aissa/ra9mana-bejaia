import { Test, TestingModule } from '@nestjs/testing';
import { SpecialConditionService } from './special-condition.service';

describe('SpecialConditionService', () => {
  let service: SpecialConditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialConditionService],
    }).compile();

    service = module.get<SpecialConditionService>(SpecialConditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
