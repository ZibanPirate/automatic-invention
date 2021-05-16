import { MigrationInterface, QueryRunner } from "typeorm";

export class customerEntity1621166582616 implements MigrationInterface {
  name = "customerEntity1621166582616";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "bio" character varying NOT NULL, "nameFirst" character varying NOT NULL, "nameLast" character varying NOT NULL, CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "PK_6053d3f7830e8ead22cde8b55d5" PRIMARY KEY ("id", "email"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
