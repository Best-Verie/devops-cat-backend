import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElectricitySellingService } from './electricity-selling.service';
import { electricity } from './entities/electricity-selling.entity';

describe('ElectricitySellingService', () => {
  let service: ElectricitySellingService;
  let repo: Repository<electricity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElectricitySellingService,
        {
          provide: getRepositoryToken(electricity),
          useValue: {
            find: jest.fn().mockResolvedValue(electricityArray),
            findOne: jest.fn().mockResolvedValue(oneMeter),
            create: jest.fn().mockReturnValue(oneMeter),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true)
          }
        }
      ]
    }).compile();

    service = module.get<MeterService>(MeterService);
    repo = module.get<Repository<Meter>>(getRepositoryToken(Meter));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of meters', async () => {
      const meters = await service.getAllMeters();
      expect(meters).toEqual(electricityArray);
    });
  });

  describe('getOne', () => {
    it('should get a single meter by meter number', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      expect(service.getMeterByMeterNumber(123456)).resolves.toEqual(oneMeter);
    });
  });

  describe('insertOne', () => {
    it('should successfully insert a meter', () => {
      expect(
        service.registerMeter({
          meter_owner: 'Peter'
        })
      ).resolves.toEqual(oneMeter);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
});
