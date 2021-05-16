import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IsNumber, IsEmail, Length } from "class-validator";
import { Service } from "typedi";

class Name {
  @Column()
  @Length(2, 54)
  first!: string;

  @Column()
  @Length(2, 54)
  last!: string;
}

@Service()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number;

  @PrimaryColumn()
  @IsEmail()
  email!: string;

  @Column(() => Name)
  name!: Name;
}
