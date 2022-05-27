/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class addProductImage1653678664124 implements MigrationInterface {

    name = 'addProductImage1653678664124';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "products" ADD "imageFile" character varying NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "products" DROP COLUMN "imageFile"');
    }

}
