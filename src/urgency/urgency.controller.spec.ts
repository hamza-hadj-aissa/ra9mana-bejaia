import { Test, TestingModule } from '@nestjs/testing';
import { UrgencyController } from './urgency.controller';
import { UrgencyService } from './urgency.service';

describe('UrgencyController', () => {
  let controller: UrgencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrgencyController],
      providers: [UrgencyService],
    }).compile();

    controller = module.get<UrgencyController>(UrgencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
