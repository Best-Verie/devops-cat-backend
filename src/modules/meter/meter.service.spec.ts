import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meter } from './entities/meter.entity';
import { MeterService } from './meter.service';

const testMeter1 = 'Test Meter 1';
const testBreed1 = 'Test Breed 1';

const meterArray = [
  new Meter(testMeter1, 'John', 456746),
  new Meter('Test Meter 2', 'jane', 337892),
  new Meter('Test Meter 3', 'pack', 127895)
];

const oneMeter = new Meter(testMeter1, 'Peter', 123456);

describe('MeterService', () => {
  let service: MeterService;
  let repo: Repository<Meter>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeterService,
        {
          provide: getRepositoryToken(Meter),
          useValue: {
            find: jest.fn().mockResolvedValue(meterArray),
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
      expect(meters).toEqual(meterArray);
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
