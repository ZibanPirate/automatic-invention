import { Column, Entity } from "typeorm";
import { Length, Matches } from "class-validator";
import { Service } from "typedi";
import { UserEntity } from "./user";

@Service()
@Entity({ name: "customers" })
export class CustomerEntity extends UserEntity {
  @Column()
  @Length(0, 256)
  bio!: string;

  @Column()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,256}$/)
  password?: string;
}
