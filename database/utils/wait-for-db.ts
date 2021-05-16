import { Client } from "pg";
import { waitFor } from "./wait-for";

const deps = [
  {
    name: "Postgres",
    condition: async () => {
      try {
        const client = new Client(process.env.POSTGRES_DB_URI);
        await client.connect();
        await client.end();
        return true;
      } catch (error) {
        return false;
      }
    },
  },
];

waitFor({ deps });
