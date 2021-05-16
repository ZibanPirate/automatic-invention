import { DotEnv, ENV } from "../src/config/types";
import { CustomerEntity } from "@ai/database/dist/entity/customer";

export const envMock: ENV = {
  NODE_ENV: "development",
  PORT: 7070,
  POSTGRES_DB_URI: "test-uri",
};

export const dotEnvMock = (
  Object.keys(envMock) as Array<keyof ENV>
).reduce<DotEnv>((pV, cV) => ({ ...pV, [cV]: `${envMock[cV]}` }), {} as DotEnv);

export const generateCustomerEntityMock = (i: number): CustomerEntity => ({
  id: i,
  name: {
    first: `John${i}`,
    last: `Doe${i}`,
  },
  bio: `Bio ${i}`,
  email: `john.doe.${i}@zakiii.com`,
});

export const generateCustomerEntityBatchMock = (i: number, count = 1) => {
  const customerEntityBatch: CustomerEntity[] = [];
  for (let index = i; index < i + count; index++) {
    customerEntityBatch.push(generateCustomerEntityMock(index));
  }
  return customerEntityBatch;
};
