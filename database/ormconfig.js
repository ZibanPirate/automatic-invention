module.exports = {
  url: process.env.POSTGRES_DB_URI,
  type: "postgres",
  synchronize: false,
  logging: false,
  entities: ["src/entity/**/*.{ts,js}"],
  migrations: ["src/migration/**/*.{ts,js}"],
  subscribers: ["src/subscriber/**/*.{ts,js}"],
  migrationsTableName: "typeorm_migration_table",
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
