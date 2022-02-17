import { ETokenStatus } from 'src/shared/enums/ETokenStatus';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('electricity')
export class electricity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  meterNumber: number;

  @Column()
  token: number;

  @Column()
  tokenStatus: ETokenStatus;

  constructor(
    amount: number,
    meter_number: number,
    token: number,
    tokenStatus: ETokenStatus
  ) {
    this.amount = amount;
    this.meterNumber = meter_number;
    this.token = token;
    this.tokenStatus = tokenStatus;
  }
}
