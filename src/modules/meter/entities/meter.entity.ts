import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('meter')
export class Meter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  owner: string;

  @Column()
  meterNumber: number;

  constructor(id: string, owner: string, meterNumber: number) {
    (this.id = id), (this.owner = owner), (this.meterNumber = meterNumber);
  }
}
