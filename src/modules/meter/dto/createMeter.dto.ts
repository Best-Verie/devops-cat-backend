import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createMeterDto {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  meter_owner: string;
}
