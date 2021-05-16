import { createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";
import { join } from "path";

// use typeorm-typedi-extensions container (typedi's)
useContainer(Container);

export const setupDB = (url: string, { databasePath }: Extra) =>
  createConnection({
    type: "postgres",
    url,
    entities: [join(databasePath, "entity/**/*.{js,ts}")],
    migrations: [join(databasePath, "migration/**/*.{js,ts}")],
    subscribers: [join(databasePath, "subscriber/**/*.{js,ts}")],
    synchronize: false,
    logging: false,
  });

interface Extra {
  databasePath: string;
}
