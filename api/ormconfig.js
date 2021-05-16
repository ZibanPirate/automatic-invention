module.exports = {
  url: process.env.POSTGRES_DB_URI,
  type: "postgres",
  synchronize: false,
  logging: false,
  entities: ["src/app/database/entity/**/*.{ts,js}"],
  migrations: ["src/app/database/migration/**/*.{ts,js}"],
  subscribers: ["src/app/database/subscriber/**/*.{ts,js}"],
  migrationsTableName: "typeorm_migration_table",
  cli: {
    entitiesDir: "src/app/database/entity",
    migrationsDir: "src/app/database/migration",
    subscribersDir: "src/app/database/subscriber",
  },
};
