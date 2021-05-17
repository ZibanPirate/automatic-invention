import { DBRecordEntity } from "@ai/database/dist/entity/basis";
import { GeneralResponse } from "../app/types";
import { ValidateNested } from "class-validator";

export class CustomerSignupResponse extends GeneralResponse {
  @ValidateNested()
  customer?: DBRecordEntity;
}
