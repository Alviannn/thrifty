/* eslint-disable quotes */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class removeQuantityBargain1653700333246 implements MigrationInterface {

    name = 'removeQuantityBargain1653700333246';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bargain_requests" DROP COLUMN "quantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bargain_requests" ADD "quantity" integer NOT NULL`);
    }

}
