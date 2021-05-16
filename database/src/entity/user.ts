import { DBRecordEntity, Name } from "./basis";
import { IsDefined, IsEmail, ValidateNested } from "class-validator";
import { Column } from "typeorm";
import { Service } from "typedi";
import { Type } from "class-transformer";

@Service()
export class UserEntity extends DBRecordEntity {
  @Column({ unique: true, primary: true })
  @IsEmail()
  email!: string;

  @Column(() => Name)
  @ValidateNested()
  @Type(() => Name)
  @IsDefined()
  name!: Name;
}
