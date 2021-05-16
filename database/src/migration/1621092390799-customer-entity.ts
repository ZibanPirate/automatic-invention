import { MigrationInterface, QueryRunner } from "typeorm";

export class customerEntity1621092390799 implements MigrationInterface {
  name = "customerEntity1621092390799";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "bio" character varying NOT NULL, "nameFirst" character varying NOT NULL, "nameLast" character varying NOT NULL, CONSTRAINT "PK_6053d3f7830e8ead22cde8b55d5" PRIMARY KEY ("id", "email"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customers"`);
  }
}
