import { Test, TestingModule } from '@nestjs/testing';
import { ElectricitySellingService } from './electricity-selling.service';

describe('ElectricitySellingService', () => {
  let service: ElectricitySellingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectricitySellingService]
    }).compile();

    service = module.get<ElectricitySellingService>(ElectricitySellingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
