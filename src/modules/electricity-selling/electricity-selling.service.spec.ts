import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ETokenStatus } from 'src/shared/enums/ETokenStatus';
import { Repository } from 'typeorm';
import { ElectricitySellingService } from './electricity-selling.service';
import { electricity } from './entities/electricity-selling.entity';

const testOwner1 = 'Test Meter 1';
const testMeterNumber = 123456;

const transactionArray = [
  new electricity(500, testMeterNumber, 2500, ETokenStatus.DEACTIVATED)
];

const oneTransaction = new electricity(
  5000,
  testMeterNumber,
  250000,
  ETokenStatus.DEACTIVATED
);
describe('ElectricitySellingService', () => {
  let service: ElectricitySellingService;
  // let repo: Repository<electricity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElectricitySellingService,
        {
          provide: getRepositoryToken(electricity),
          useValue: {
            find: jest.fn().mockResolvedValue(transactionArray),
            findOne: jest.fn().mockResolvedValue(oneTransaction),
            create: jest.fn().mockReturnValue(oneTransaction),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true)
          }
        }
      ]
    }).compile();

    service = module.get<ElectricitySellingService>(ElectricitySellingService);
    // repo = module.get<Repository<ElectricitySellingService>>(getRepositoryToken(electricity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of meters', async () => {
      const meters = await service.getAllTransactions();
      expect(meters).toEqual(transactionArray);
    });
  });

  describe('make transaction ', () => {
    it('should successfully insert a meter', () => {
      expect(
        service.makeTransaction({
          amount: 5000,
          meterNumber: testMeterNumber
        })
      ).resolves.toEqual(oneTransaction);
      // expect(repo.create).toBeCalledTimes(1);
      // expect(repo.save).toBeCalledTimes(1);
    });
  });
});
