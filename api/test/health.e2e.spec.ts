import Axios from "axios";
import { GeneralResponse } from "../src/app/types";
import { apiURL } from "./config";

describe("SearchController", () => {
  it("return 200 with mes is current date", async () => {
    const { data } = await Axios.get(`${apiURL}/Health`);
    expect(data).toMatchObject<GeneralResponse>({
      code: 200,
      msg: expect.any(String),
    });
  });
});
