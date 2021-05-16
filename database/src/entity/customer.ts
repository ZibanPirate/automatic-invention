import { Column, Entity } from "typeorm";
import { Length } from "class-validator";
import { Service } from "typedi";
import { UserEntity } from "./user";

@Service()
@Entity({ name: "customers" })
export class CustomerEntity extends UserEntity {
  @Column()
  @Length(0, 256)
  bio!: string;
}
