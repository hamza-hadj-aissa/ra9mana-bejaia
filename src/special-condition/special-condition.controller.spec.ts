import { Test, TestingModule } from '@nestjs/testing';
import { SpecialConditionController } from './special-condition.controller';
import { SpecialConditionService } from './special-condition.service';

describe('SpecialConditionController', () => {
  let controller: SpecialConditionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialConditionController],
      providers: [SpecialConditionService],
    }).compile();

    controller = module.get<SpecialConditionController>(SpecialConditionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
