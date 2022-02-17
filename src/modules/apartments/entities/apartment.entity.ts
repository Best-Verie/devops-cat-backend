import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Apartment {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;


  constructor(name: string)
  constructor(name?: string){
    this.name = name || '';
  }
}
