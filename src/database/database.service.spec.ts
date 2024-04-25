import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('DatabaseService', () => {
  let service: DeepMockProxy<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDeep<DatabaseService>())
      .compile();

    service = module.get<DeepMockProxy<DatabaseService>>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
