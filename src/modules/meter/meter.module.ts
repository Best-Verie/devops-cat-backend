import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meter } from './entities/meter.entity';
import { MeterController } from './meter.controller';
import { MeterService } from './meter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meter])],
  controllers: [MeterController],
  providers: [MeterService],
  exports: [MeterService]
})
export class MeterModule {}
