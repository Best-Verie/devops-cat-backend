import { Test, TestingModule } from '@nestjs/testing';
import { ElectricitySellingController } from './electricity-selling.controller';

describe('ElectricitySellingController', () => {
  let controller: ElectricitySellingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectricitySellingController]
    }).compile();

    controller = module.get<ElectricitySellingController>(
      ElectricitySellingController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
