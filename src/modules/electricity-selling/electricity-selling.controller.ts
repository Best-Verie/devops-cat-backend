import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public-decorator.decorator';
import { createTransactionDto } from './dto/createTransactionDto';
import { ElectricitySellingService } from './electricity-selling.service';

@Controller('transactions')
export class ElectricitySellingController {
  constructor(private readonly electricityService: ElectricitySellingService) {}

  @Public()
  @Get('all')
  public async getAllMeters(): Promise<any> {
    console.log('ghbjnklkjhcvb');
    return await this.electricityService.getAllTransactions();
  }

  @Public()
  @Get('one/:meterNumber')
  public async getMeterByMeterNumber(
    @Param('meterNumber') meterNumber: number
  ): Promise<any> {
    return await this.electricityService.getTransactionByMeterNumber(
      meterNumber
    );
  }

  @Public()
  @Post('/new')
  async newTransaction(
    @Body() transaction: createTransactionDto
  ): Promise<any> {
    return await this.electricityService.makeTransaction(transaction);
  }
}
