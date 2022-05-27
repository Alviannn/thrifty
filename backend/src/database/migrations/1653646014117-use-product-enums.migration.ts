/* eslint-disable quotes */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class useProductEnums1653646014117 implements MigrationInterface {

    name = 'useProductEnums1653646014117';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."products_type_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "products" ADD "type" "public"."products_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "balance" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "bargain_requests" DROP CONSTRAINT "FK_bd04969c2e923035cf2d2908c7d"`);
        await queryRunner.query(`ALTER TABLE "bargain_requests" ALTER COLUMN "product_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bargain_requests" ADD CONSTRAINT "FK_bd04969c2e923035cf2d2908c7d" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bargain_requests" DROP CONSTRAINT "FK_bd04969c2e923035cf2d2908c7d"`);
        await queryRunner.query(`ALTER TABLE "bargain_requests" ALTER COLUMN "product_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bargain_requests" ADD CONSTRAINT "FK_bd04969c2e923035cf2d2908c7d" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "balance" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."products_type_enum"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "type" integer NOT NULL`);
    }

}
