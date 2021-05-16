import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";
import { Service } from "typedi";

@Service()
export class Name {
  @Column()
  @Length(2, 54)
  first!: string;

  @Column()
  @Length(2, 54)
  last!: string;
}

@Service()
export class DBRecordEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}
