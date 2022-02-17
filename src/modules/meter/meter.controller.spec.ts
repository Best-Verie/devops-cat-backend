import { Test, TestingModule } from '@nestjs/testing';
import { createMeterDto } from './dto/createMeter.dto';
import { MeterController } from './meter.controller';
import { MeterService } from './meter.service';

const testOwner1 = 'Lisa';
const testMeterNumber = 123456;

describe('MeterController', () => {
  let controller: MeterController;
  let service: MeterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeterController],
      providers: [
        {
          provide: MeterService,
          useValue: {
            getAllMeters: jest.fn().mockResolvedValue([
              { owner: 'jane', meterNumber: 128956 },
              { owner: 'Test meter 2', meterNumber: 378453 },
              { owner: 'Test meter 3', meterNumber: 789234 }
            ]),
            getMeterById: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                owner: testOwner1,
                meterNumber: testMeterNumber
              })
            ),
            getMeterByMeterNumber: jest
              .fn()
              .mockImplementation((meterNumber: number) =>
                Promise.resolve({ meterNumber, owner: testOwner1 })
              ),
            registerMeter: jest
              .fn()
              .mockImplementation((meter: createMeterDto) =>
                Promise.resolve({ id: 'a uuid', ...meter })
              ),
            updateMeter: jest
              .fn()
              .mockImplementation((meter: createMeterDto) =>
                Promise.resolve({ id: 'a uuid', ...meter })
              ),
            deleteMeter: jest.fn().mockResolvedValue({ deleted: true })
          }
        }
      ]
    }).compile();

    controller = module.get<MeterController>(MeterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getmeters', () => {
    it('should get an array of meters', async () => {
      await expect(controller.getAllMeters()).resolves.toEqual([
        {
          owner: testOwner1,
          meterNumber: testMeterNumber
        },
        {
          owner: 'jane',
          meterNumber: 673848
        },
        {
          owner: 'peter',
          meterNumber: 974638
        }
      ]);
    });
  });

  describe('getByMeterNumber', () => {
    it('should get a meter by meter number', async () => {
      await expect(controller.getMeterByMeterNumber(123456)).resolves.toEqual({
        owner: 'Ventus',
        meterNumber: testMeterNumber
      });
      const getByMeterNumberSpy = jest
        .spyOn(service, 'getMeterByMeterNumber')
        .mockResolvedValueOnce({
          owner: 'Aqua',
          meterNumber: testMeterNumber,
          id: 'a new uuid'
        });
      await expect(
        controller.getMeterByMeterNumber(testMeterNumber)
      ).resolves.toEqual({
        owner: 'Aqua',
        meterNumber: testMeterNumber,
        id: 'a new uuid'
      });
      expect(getByMeterNumberSpy).toBeCalledWith(testMeterNumber);
    });
  });
  describe('new meter', () => {
    it('should create a new meter', async () => {
      const newmeterDTO: createMeterDto = {
        meter_owner: 'New meter 1'
      };
      await expect(controller.newMeter(newmeterDTO)).resolves.toEqual({
        id: 'a uuid',
        meterNumber: testMeterNumber,
        ...newmeterDTO
      });
    });
  });
});
