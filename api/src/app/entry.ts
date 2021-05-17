import "reflect-metadata";

import { Application } from "express";
import { ConfigService } from "../config/service";
import Container from "typedi";
import { LoggerService } from "../logger/service";
import { createExpressServer } from "routing-controllers";
import { join } from "path";
import { routingControllersOptions } from "./router";
import { setupDB } from "@ai/database/dist";

const bootstrap = async () => {
  const { NODE_ENV, PORT, POSTGRES_DB_URI } =
    Container.get(ConfigService).env();
  await setupDB(POSTGRES_DB_URI, {
    databasePath: join(__dirname, "../../../database/dist"),
  });
  const loggerService = Container.get(LoggerService);

  const app: Application = createExpressServer(routingControllersOptions);

  app.listen(PORT, async () => {
    loggerService.info({
      message: `API listening at ${
        NODE_ENV === "development" ? "http://localhost:" : "port: "
      }${PORT}`,
    });
  });
};

bootstrap();
