import { Column, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNumber, Length } from "class-validator";
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

  @Column({ unique: true, primary: true })
  @IsEmail()
  email!: string;

  @Column(() => Name)
  name!: Name;
}
