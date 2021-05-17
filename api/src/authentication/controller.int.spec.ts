import { HttpError, InternalServerError } from "routing-controllers";
import { AuthenticationController } from "./controller";
import { CustomerEntity } from "@ai/database/dist/entity/customer";
import { CustomerRepository } from "../customer/repository";
import { CustomerSignupResponse } from "./types";
import { envMock } from "../../test/mocks";
import { Container as typeORMContainer } from "typeorm-typedi-extensions";

jest.mock("dotenv", () => ({ config: () => ({ parsed: envMock }) }));
jest.mock("typeorm", () => {
  const propertyDecoratorMock = (id: string) =>
    jest.fn().mockReturnValue(jest.fn().mockReturnValue({ id }));
  const classDecoratorMock = (id: string, props = {}) =>
    jest
      .fn()
      .mockReturnValue(
        jest.fn().mockReturnValue(jest.fn().mockReturnValue({ id, ...props })),
      );

  return {
    PrimaryColumn: propertyDecoratorMock("PrimaryColumn"),
    Column: propertyDecoratorMock("Column"),
    PrimaryGeneratedColumn: propertyDecoratorMock("PrimaryGeneratedColumn"),
    Entity: classDecoratorMock("Entity"),
    EntityRepository: classDecoratorMock("EntityRepository", {
      insert: async ({ email }: CustomerEntity) => {
        switch (email) {
          case "exists@zakiii.com":
            throw new Error("duplicate key value violates unique constraint");

          case "error@zakiii.com":
            throw new InternalServerError("test-error");

          default:
            return { identifiers: [{ id: 0 }] };
        }
      },
    }),
    Repository: class {},
  };
});

describe("AuthenticationController", () => {
  const customerRepository = typeORMContainer.get(CustomerRepository);
  const mockedInput = {
    bio: "test-bio",
    email: "exists@zakiii.com",
    name: {
      first: "John",
      last: "Doe",
    },
    password: "123-test-password",
  };
  it("should return 500 when there's an internal server error", async () => {
    const authenticationController = new AuthenticationController(
      customerRepository,
    );

    expect(
      authenticationController.customerSignup(mockedInput),
    ).rejects.toMatchObject<Partial<HttpError>>({
      message: "email is already being used",
      httpCode: 409,
    });
  });

  it("should return 409 when email is already being used", async () => {
    const authenticationController = new AuthenticationController(
      customerRepository,
    );

    expect(
      authenticationController.customerSignup({
        ...mockedInput,
        email: "error@zakiii.com",
      }),
    ).rejects.toMatchObject<Partial<HttpError>>({
      message: "test-error",
      httpCode: 500,
    });
  });

  it("should return 200 with customer id when everything goes well ", async () => {
    const authenticationController = new AuthenticationController(
      customerRepository,
    );

    expect(
      authenticationController.customerSignup({
        ...mockedInput,
        email: "test@zakiii.com",
      }),
    ).resolves.toMatchObject<CustomerSignupResponse>({
      code: 200,
      customer: {
        id: 0,
      },
    });
  });
});
