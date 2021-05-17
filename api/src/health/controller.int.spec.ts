import { GeneralResponse } from "../app/types";
import { HealthController } from "./controller";

describe("HealthController", () => {
  it("should return 200 with customer id when everything goes well ", async () => {
    const healthController = new HealthController();

    expect(healthController.health()).resolves.toMatchObject<GeneralResponse>({
      code: 200,
      msg: expect.any(String),
    });
  });
});
