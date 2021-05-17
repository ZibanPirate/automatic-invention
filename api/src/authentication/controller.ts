import { Body, HttpError, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { CustomerEntity } from "@ai/database/dist/entity/customer";
import { CustomerRepository } from "../customer/repository";
import { CustomerSignupResponse } from "./types";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Service } from "typedi";

@Service()
@JsonController("/Authentication")
export class AuthenticationController {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: CustomerRepository,
  ) {}

  @Post("/CustomerSignup")
  @OpenAPI({ summary: "Signup a Customer up" })
  @ResponseSchema(CustomerSignupResponse)
  public async customerSignup(
    @Body() input: CustomerEntity,
  ): Promise<CustomerSignupResponse> {
    try {
      const insertResult = await this.customerRepository.insert(input);
      const id = insertResult.identifiers[0].id as number;
      return {
        code: 200,
        customer: { id },
      };
    } catch (error) {
      if (
        (error.message as string).startsWith(
          "duplicate key value violates unique constraint",
        )
      ) {
        throw new HttpError(409, "email is already being used");
      }
      throw error;
    }
  }
}
