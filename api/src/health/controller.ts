import { Get, JsonController } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { GeneralResponse } from "../app/types";
import { Service } from "typedi";

@Service()
@JsonController("/Health")
export class HealthController {
  @Get("/")
  @OpenAPI({ summary: "Check if server is up" })
  @ResponseSchema(GeneralResponse)
  public async health(): Promise<GeneralResponse> {
    return {
      code: 200,
      msg: new Date().toISOString(),
    };
  }
}
