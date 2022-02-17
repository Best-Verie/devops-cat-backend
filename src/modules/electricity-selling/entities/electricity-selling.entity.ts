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
}
