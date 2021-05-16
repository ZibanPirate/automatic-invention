import { setupDB } from ".";

jest.mock("typeorm", () => ({
  createConnection: jest.fn().mockResolvedValue({ testConnected: true }),
  useContainer: jest.fn(),
}));
describe("setupDB", () => {
  it("create a connection with the supplied URI", () => {
    expect(
      setupDB("test-uri", { databasePath: "test-db-path" }),
    ).resolves.toMatchObject({ testConnected: true });
  });
});
