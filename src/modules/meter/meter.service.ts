import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Meter } from './entities/meter.entity';
import { createMeterDto } from './dto/createMeter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MeterService {
  constructor(
    @InjectRepository(Meter)
    private readonly meterRepository: Repository<Meter>
  ) {}

  getAllMeters() {
    try {
      const meters = this.meterRepository.find();
      return meters;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getMeterByMeterNumber(mnumber: number) {
    try {
      const meters = this.meterRepository.findOne({
        where: {
          meterNumber: mnumber
        }
      });

      if (!meters) {
        throw new NotFoundException('Meter not found');
      }

      return meters;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  registerMeter(meterDto: createMeterDto) {
    console.log(meterDto);
    try {
      const owner = meterDto.meter_owner;
      const meterNumber = this.randomFixedMeterNumber(6);

      const meter: Meter = this.meterRepository.create({
        owner,
        meterNumber
      });

      return this.meterRepository.save(meter);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  randomFixedMeterNumber(length: number) {
    return Math.floor(
      Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
    );
  }
}
