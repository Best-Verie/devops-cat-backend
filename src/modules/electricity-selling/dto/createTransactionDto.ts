import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createTransactionDto {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  meterNumber: number;
}
