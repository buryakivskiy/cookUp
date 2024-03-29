import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoGeneratedMigrations1704432309834 implements MigrationInterface {
    name = 'AutoGeneratedMigrations1704432309834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Recipe" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "ingredients" character varying NOT NULL, "tagline" character varying NOT NULL, "imageUrl" character varying NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_b9c01b332bc8086926e5aed4fe5" UNIQUE ("name"), CONSTRAINT "PK_a3656b4e22e51054d1242b0e2ee" PRIMARY KEY ("id", "userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Recipe"`);
    }

}
