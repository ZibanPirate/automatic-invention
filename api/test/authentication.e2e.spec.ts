import Axios, { AxiosError, AxiosResponse } from "axios";
import { CustomerEntity } from "@ai/database/dist/entity/customer";
import { CustomerSignupResponse } from "../src/authentication/types";
import { apiURL } from "./config";
import { generateCustomerEntityMock } from "./mocks";

describe("AuthenticationController", () => {
  it("return 400 with error messages when body is invalid", async () => {
    expect(
      Axios.post(`${apiURL}/Authentication/CustomerSignup`, {}),
    ).rejects.toMatchObject<Partial<AxiosError>>({
      message: "Request failed with status code 400",
      response: {
        data: {
          code: 400,
          msg: expect.any(Array),
        },
      } as AxiosResponse,
    });
  });

  it("return 200 with customer id when everything goes well", async () => {
    const { data } = await Axios.post(
      `${apiURL}/Authentication/CustomerSignup`,
      {
        ...generateCustomerEntityMock(Math.round(Math.random() * 10000)),
        password: "123testPassword",
      } as CustomerEntity,
    );
    expect(data).toMatchObject<CustomerSignupResponse>({
      code: 200,
      customer: {
        id: expect.any(Number),
      },
    });
  });
});
