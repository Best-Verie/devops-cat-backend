import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { create } from 'domain';
import { Public } from 'src/decorators/public-decorator.decorator';
import { createMeterDto } from './dto/createMeter.dto';
import { Meter } from './entities/meter.entity';
import { MeterService } from './meter.service';

@Controller('meters')
export class MeterController {
  constructor(private readonly meterService: MeterService) {}

  // @Public()
  // @Post('new')
  // newMeter(@Body() meter: createMeterDto): Promise<any> {
  // console.log("heyyyyyyyyyyyy")
  // return  this.meterService.registerMeter(meter);
  // }

  @Public()
  @Get('all')
  getAllMeters(): Promise<any> {
    console.log('ghbjnklkjhcvb');
    return this.meterService.getAllMeters();
  }

  @Public()
  @Get('one/:meterNumber')
  getMeterByMeterNumber(
    @Param('meterNumber') meterNumber: number
  ): Promise<any> {
    console.log('ghbjnklkjhcvb');
    return this.meterService.getMeterByMeterNumber(meterNumber);
  }

  @Public()
  @Post('/new')
  newMeter(@Body() meter: createMeterDto): Promise<any> {
    return this.meterService.registerMeter(meter);
  }
}
