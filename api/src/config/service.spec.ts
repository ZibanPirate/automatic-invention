import { DotEnv, ENV } from "./types";
import { dotEnvMock, envMock } from "../../test/mocks";
import { ConfigService } from "./service";
import dotenv from "dotenv";

jest.mock("dotenv");
const mockedDotenv = dotenv as jest.Mocked<typeof dotenv>;

let OLD_ENV: NodeJS.ProcessEnv;
describe("ConfigService", () => {
  beforeAll(() => {
    OLD_ENV = Object.assign({}, process.env);
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("should throw error when .env has invalid key value pair", async () => {
    mockedDotenv.config.mockReturnValue({
      parsed: { ...dotEnvMock, POSTGRES_DB_URI: "" },
    });

    expect(() => new ConfigService()).toThrowError(
      `⚠️  Errors in .env file in the following keys:\nPOSTGRES_DB_URI : {\"isLength\":\"POSTGRES_DB_URI must be longer than or equal to 8 characters\"}`,
    );
  });

  it("should throw error when .env doesn't have at least one Required key or its value is null", async () => {
    mockedDotenv.config.mockReturnValue({ parsed: { NODE_ENV: "testing" } });

    expect(() => new ConfigService()).toThrow();
  });

  it("should return default envs when their keys don't exist on .env", async () => {
    mockedDotenv.config.mockReturnValue({
      parsed: {
        POSTGRES_DB_URI: "test-uri",
      } as DotEnv,
    });
    process.env = { NODE_ENV: "development" };

    const configService = new ConfigService();
    expect(configService).toBeInstanceOf(ConfigService);
    expect(configService.env()).toMatchObject<ENV>(envMock);
  });
});
