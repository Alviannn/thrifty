/* eslint-disable quotes */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class addBargainRequest1653635201924 implements MigrationInterface {

    name = 'addBargainRequest1653635201924';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bargain_requests_status_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "bargain_requests" ("id" SERIAL NOT NULL, "price" numeric NOT NULL, "status" "public"."bargain_requests_status_enum" NOT NULL DEFAULT '0', "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP, "user_id" integer, "product_id" integer, CONSTRAINT "PK_f3912a87a15cd57e4cf150f85b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "bargain_requests" ADD CONSTRAINT "FK_2ce096766f86cae4d3025f2ac24" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bargain_requests" ADD CONSTRAINT "FK_bd04969c2e923035cf2d2908c7d" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bargain_requests" DROP CONSTRAINT "FK_bd04969c2e923035cf2d2908c7d"`);
        await queryRunner.query(`ALTER TABLE "bargain_requests" DROP CONSTRAINT "FK_2ce096766f86cae4d3025f2ac24"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`DROP TABLE "bargain_requests"`);
        await queryRunner.query(`DROP TYPE "public"."bargain_requests_status_enum"`);
    }

}
