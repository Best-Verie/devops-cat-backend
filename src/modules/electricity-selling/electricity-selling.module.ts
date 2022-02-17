import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterModule } from '../meter/meter.module';
import { ElectricitySellingController } from './electricity-selling.controller';
import { ElectricitySellingService } from './electricity-selling.service';
import { electricity } from './entities/electricity-selling.entity';

@Module({
  imports: [TypeOrmModule.forFeature([electricity]), MeterModule],
  controllers: [ElectricitySellingController],
  providers: [ElectricitySellingService]
})
export class ElectricitySellingModule {}
