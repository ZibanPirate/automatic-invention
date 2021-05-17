import { LogLevel, LoggerService } from "./service";
import Winston, { Logger } from "winston";
import { Transports } from "winston/lib/winston/transports";

jest.mock("winston"); //, () => ({ format: { json: jest.fn(), combine: jest.fn(), colorize: jest.fn(), simple: jest.fn() }, transports: { Console: jest.fn() } }));
const mockedWinston = Winston as jest.Mocked<typeof Winston>;

describe("LoggerService", () => {
  mockedWinston.format.json = jest.fn();
  mockedWinston.format.colorize = jest.fn();
  mockedWinston.format.simple = jest.fn();
  mockedWinston.format.combine = jest.fn();
  mockedWinston.transports = { Console: class {} } as unknown as Transports;

  it.each<LogLevel>(["info", "debug", "error", "warn"])(
    "should log a %s type of log",
    async (key) => {
      const log = jest.fn();
      mockedWinston.createLogger.mockReturnValue({ log } as unknown as Logger);
      const loggerService = new LoggerService();

      loggerService[key]({ message: "test-log" });

      expect(log).toBeCalledTimes(1);
    },
  );
});
